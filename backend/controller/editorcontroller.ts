import { Router } from "express";


import {prisma} from "../db/db.ts"
import { z} from "zod"

const editorRoutes  = Router();




// List all projects (optionally by userId)
editorRoutes.get('/projects', async (req, res) => {
    const userId = typeof req.query.userId === "string" ? req.query.userId : undefined;
    const projects = await prisma.project.findMany({
        where: userId ? { userId } : undefined,
        include: { files: true, chats: true },
        orderBy: { createdAt: "desc" }
    });
    return res.status(200).json(projects);
})


const createProjectSchema = z.object({
    userId: z.string(),
    name: z.string().min(1).default("Untitled Project"),
    files: z.array(z.object({
        id: z.string().optional(),
        name: z.string().min(1),
        content: z.string().optional(),
        isFolder: z.boolean().optional(),
        parentId: z.string().optional()
    })).optional()
})

editorRoutes.post('/create-project', async (req, res) => {
    const parsed = createProjectSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
    }

    const { userId, name, files } = parsed.data;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = await prisma.$transaction(async (tx) => {
            const project = await tx.project.create({
                data: { userId, name }
            });

            if (Array.isArray(files) && files.length > 0) {
                // Create parent-first where possible
                const createdIds = new Set<string>();
                let pending = [...files];
                let progressed = true;
                while (pending.length > 0 && progressed) {
                    progressed = false;
                    const next: typeof pending = [];
                    for (const f of pending) {
                        const parentOk = !f.parentId || createdIds.has(f.parentId);
                        if (parentOk) {
                            const created = await tx.file.create({
                                data: {
                                    ...(f.id ? { id: f.id } : {}),
                                    name: f.name,
                                    content: f.content ?? "",
                                    isFolder: f.isFolder ?? false,
                                    projectId: project.id,
                                    parentId: f.parentId ?? null
                                },
                                select: { id: true }
                            });
                            createdIds.add(created.id);
                            progressed = true;
                        } else {
                            next.push(f);
                        }
                    }
                    pending = next;
                }
                if (pending.length > 0) {
                    return res.status(400).json({ message: "Invalid files: some parentId values do not exist or are ordered after children" });
                }
            }

            return await tx.project.findUnique({
                where: { id: project.id },
                include: { files: true, chats: true }
            });
        });

        if (!result) return res.status(500).json({ message: "Failed to load created project" });
        return res.status(201).json(result);
    } catch (e) {
        console.error("create-project error:", e);
        const message = e instanceof Error ? e.message : "Failed to create project";
        return res.status(500).json({ message });
    }
})
// Get single project
editorRoutes.get('/project/:id', async (req, res) => {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
        where: { id },
        include: { files: true, chats: true }
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    return res.status(200).json(project);
})

// Update project name
editorRoutes.put('/project/:id', async (req, res) => {
    const { id } = req.params;
    const name = typeof req.body?.name === "string" ? req.body.name : undefined;
    if (!name) return res.status(400).json({ message: "name is required" });
    const project = await prisma.project.update({
        where: { id },
        data: { name },
        include: { files: true, chats: true }
    });
    return res.status(200).json(project);
})

// Delete project
editorRoutes.delete('/project/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    return res.status(204).json({
      id
    });
})

export default editorRoutes;

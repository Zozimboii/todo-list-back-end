import database from "../service/database.js";

export async function getAllTask(req,res) {
    console.log(`GET /tasks is requested`)
    try{
       
        const result = await database.query(`SELECT * FROM tasks ORDER BY "dates" ASC`)
        return res.status(200).json(result.rows)

    }catch(err){
        return res.status(500).json({error:err.message})
    }
   
}
export async function getTaskById(req,res) {
    console.log(`putbyid /tasks/${req.params.id} is requested`)
    const taskId = req.params.id;

        const { statusChk } = req.body;
        try {
            const existsResult = await database.query({
                text: `SELECT EXISTS (SELECT * FROM tasks WHERE "taskId"=$1)`,
                values: [taskId]
            });
            if (!existsResult.rows[0].exists) {
                return res.status(400).json({ error: `taskId ${taskId} not found` });
            }

            const result = await database.query({
                text: `UPDATE tasks SET "statusChk"=$1 WHERE "taskId"=$2`,
                values: [statusChk, taskId]
            });
            
            return res.status(200).json({ message: 'Task updated successfully', data: result.rows[0] });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
}

export async function postTask(req,res) {
    console.log(`POST /task is requested`)

    try{
        const result = await database.query({
            text:`INSERT INTO tasks ("taskId","user_Id","title","description","dates") VALUES($1,$2,$3,$4,$5)`,
            values:[
                req.body.taskId,
                req.body.user_Id,
                req.body.title,
                req.body.description,
                req.body.dates,
                
             
            ]
        })
        return res.status(201).json({message:`Task added successful`})
    }catch(err){
        return res.status(500).json({error:err.message})
    }
    
}

export async function editTask(req, res) {
    console.log(`PUT /task/${req.params.id} is requested`);
    const taskId = req.params.id;

        const { title, description, dates } = req.body;
        try {
            const existsResult = await database.query({
                text: `SELECT EXISTS (SELECT * FROM tasks WHERE "taskId"=$1)`,
                values: [taskId]
            });
            if (!existsResult.rows[0].exists) {
                return res.status(400).json({ error: `taskId ${taskId} not found` });
            }

            const result = await database.query({
                text: `UPDATE tasks SET "title"=$1, "description"=$2, "dates"=$3 WHERE "taskId"=$4`,
                values: [title, description, dates, taskId]
            });
            
            return res.status(200).json({ message: 'Task updated successfully', data: result.rows[0] });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    };


export async function deleteTask(req,res){
    console.log(`DELETE /task/${req.params.id} is requested`)
    const taskId = req.params.id;
    try{
        const existsResult = await database.query({
            text:`SELECT EXISTS (SELECT * FROM tasks WHERE "taskId"=$1)`,
            values:[taskId]
        })
        if(!existsResult.rows[0].exists){
            return res.status(404).json({error: `taskId ${taskId} not found`})
        }
        const result = await database.query({
            text:`DELETE FROM tasks WHERE "taskId" = $1`,
            values:[taskId]
        })
        return res.status(200).json({message:'Task deleted successfully', data: result.rows[0]})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

export async function getSearchTask(req,res){
    console.log(`GET /Search/${req.params.id} is requested`)
    try{
        const result = await database.query({
            text: `SELECT * FROM tasks WHERE "title" ILIKE $1`,
            values:[`%${req.params.id}%`]
        })
        return res.status(200).json(result.rows)
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
}

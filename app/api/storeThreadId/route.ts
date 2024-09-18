import fs from 'fs';
import path from 'path';

// Path to the data file
const dataFilePath = path.join(process.cwd(), 'data', 'threadId.json');

// Send a new message to a thread
export async function POST(request) {
    const { threadId } = await request.json();

    let existingData = [];
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        if (fileContent) {
            existingData = JSON.parse(fileContent)
        }
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error('Error reading file:', error);
        }
    }
    // Ensure existingData is an array
    if (!Array.isArray(existingData)) {
        console.error('Data is not an array, resetting to empty array.');
        existingData = [];
    }
    // Append the new threadId to the existing data
    existingData.push(threadId);

    // Write the updated array back to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2), 'utf8');
    return Response.json({ threadId: threadId })
};
  

// Handler for POST requests
// export const POST: NextApiHandler = async (req, res) => {
//   const { threadId } = req.body;

//   try {
//     const data = { threadId };
//     fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
//     res.status(200).json({ success: true, message: 'Thread ID saved successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to save thread ID', error: error.message });
//   }
// };
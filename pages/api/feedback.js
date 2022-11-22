import fs from "fs";
import path from "path";

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

export const extractFeedback = (filepath) => {
  const fileData = fs.readFileSync(filepath);
  const data = JSON.parse(fileData);

  return data;
};

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      id: Date.now().toString(),
      email,
      feedback,
    };

    // * store data to database or in a file
    const filepath = buildFeedbackPath();
    const data = extractFeedback(filepath);
    data.push(newFeedback);
    fs.writeFileSync(filepath, JSON.stringify(data));
    res
      .status(201)
      .json({ message: "Success add new feedback!", feedback: newFeedback });
  } else {
    const filepath = buildFeedbackPath();
    const data = extractFeedback(filepath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;

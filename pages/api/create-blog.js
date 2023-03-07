import fs from "fs";
import matter from "gray-matter";

export default async function handler(req, res) {
    if (req.method === "POST" && req.url === '/api/create-blog') {
        const { data: frontmatter } = matter(req.body);
        const title = frontmatter.title.replace(/[^\w\s]/gi, "").replace(/\s+/g, "-").toLowerCase().trim();
        const category = frontmatter.category.toLowerCase();
        try {
            fs.writeFileSync(`posts/${category}/${title}.md`, req.body);
            return res.status(200).json({ message: "Create Successfully!" });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: "Create Error!" });
        }
    }
}

import fs from "fs";
import matter from "gray-matter";

export default async function handler(req, res) {
    if (req.method === "POST" && req.url === "/api/create-blog") {
        const { data: frontmatter } = matter(req.body);
        const title = frontmatter.title
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-")
            .toLowerCase()
            .trim();
        const category = frontmatter.category.toLowerCase();
        // try {
        fs.writeFile(
            `posts/${category}/${title}.md`,
            req.body,
            {
                encoding: "utf8",
                flag: "w",
                mode: 0o666,
            },
            (err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Create Error!" });
                } else {
                    return res.status(200).json({ message: "Create Successfully!" });
                }
            }
        );
        // fs.writeFileSync(`posts/${category}/${title}.md`, req.body);
        // } catch (err) {
        //     console.error(err);
        // }
    }
}

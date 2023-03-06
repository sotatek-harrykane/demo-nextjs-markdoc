import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";

export async function getStaticPaths() {
    const files = fs.readdirSync("posts/webinars");
    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace(".md", ""),
        },
    }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } } :any) {
    const fileName = fs.readFileSync(`posts/webinars/${slug}.md`, "utf-8");
    const { data: frontmatter, content } = matter(fileName);
    return {
        props: {
            frontmatter,
            content,
        },
    };
}

export default function PostPage({ frontmatter, content }: any) {
    return (
        <div className="prose lg:prose-xl mx-auto">
            <h1>{frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
        </div>
    );
}

import * as fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { useEffect, useState } from "react";

const arrCategories = ["blog", "whitepaper", "webinars"];

export async function getStaticProps() {
    const data: any[] = [];
    arrCategories.forEach((category) => {
        const files = fs.readdirSync(`posts/${category}`);
        const posts = files.map((fileName) => {
            const slug = fileName.replace(".md", "");
            const readFile = fs.readFileSync(`posts/${category}/${fileName}`, "utf-8");
            const { data: frontmatter } = matter(readFile);
            return {
                slug,
                frontmatter,
            };
        });
        data.push({
            [`${category}`]: posts,
        });
    });
    return {
        props: {
            data,
        },
    };
}

export default function Home({ data }: any) {
    const [tab, setTab] = useState<string>("all");
    const [dataNew, setDataNew] = useState<any>({
        all: [],
        blog: [],
        whitepaper: [],
        webinars: [],
    });
    const active =
        "inline-block w-full p-4 text-gray-900 bg-gray-100 focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white";
    const inactive =
        "inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700";

    useEffect(() => {
        let mergedArray: any[] = [];
        data.forEach((item: any) => {
            const key = Object.keys(item)[0];
            mergedArray = mergedArray.concat(item[key]);
        });
        const blogPosts = [...data.find((item: any) => item.blog).blog];
        const whitePaperPosts = [...data.find((item: any) => item.whitepaper).whitepaper];
        const webinarsPosts = [...data.find((item: any) => item.webinars).webinars];
        setDataNew({ ...dataNew, all: mergedArray, blog: blogPosts, whitepaper: whitePaperPosts, webinars: webinarsPosts });
    }, []);

    return (
        <>
            <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                <li className="w-full" onClick={() => setTab("all")}>
                    <a href="#" className={tab === "all" ? `${active} rounded-l-lg` : `${inactive} rounded-l-lg`} aria-current="page">
                        All
                    </a>
                </li>
                <li className="w-full" onClick={() => setTab("blog")}>
                    <a href="#" className={tab === "blog" ? active : inactive}>
                        Blog
                    </a>
                </li>
                <li className="w-full" onClick={() => setTab("webinars")}>
                    <a href="#" className={tab === "webinars" ? active : inactive}>
                        Webinars
                    </a>
                </li>
                <li className="w-full" onClick={() => setTab("whitepaper")}>
                    <a href="#" className={tab === "whitepaper" ? `${active} rounded-r-lg` : `${inactive} rounded-r-lg`}>
                        Whitepaper
                    </a>
                </li>
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0 flex flex-column justify-items-center mt-3">
                {dataNew[tab]?.map(({ slug, frontmatter }: any) => {
                    console.log(`/post/${tab}/${slug}`);
                    const tagLowerCase = frontmatter.category.toLowerCase();
                    return (
                        <div key={slug} className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col">
                            <Link href={`/post/${tagLowerCase}/${slug}`}>
                                <img
                                    width={412}
                                    height={268}
                                    className="rounded-xl max-w-full h-auto"
                                    alt={frontmatter.title}
                                    src={`${frontmatter.socialImage}`}
                                />
                                <div className="p-2 grid grid-cols-3 gap-4 flex items-center">
                                    <div className="p-2 rounded-xl bg-purple-200 text-purple-600 text-center">
                                        <b>{frontmatter.category}</b>
                                    </div>
                                    <h3 className="col-span-2 text-slate-500">{frontmatter.date}</h3>
                                </div>
                                <div className="px-4 pb-4">
                                    <h1 className="text-[22px] font-bold">{frontmatter.title}</h1>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

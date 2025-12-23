import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../services/api.js";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchBlogs()
      .then((data) => {
        if (isMounted) {
          setBlogs(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="container mx-auto pt-16 pb-12">
      <div className="section-shell space-y-8">
        <div className="space-y-3">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Blogs
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-theme-tc leading-tight">
            Writing on product, engineering, and delivery.
          </h1>
          <p className="text-lg text-theme-lc max-w-2xl">
            Field notes from shipping SaaS, leading teams, and building reliable systems.
          </p>
        </div>

        {isLoading ? (
          <p className="text-theme-lc">Loading posts...</p>
        ) : blogs.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.map((blog) => (
              <article key={blog._id} className="surface-card p-6 space-y-4">
                {blog.coverImage && (
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="h-48 w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                )}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-theme-tc">
                    <Link to={`/blogs/${blog.slug}`} className="hover:text-theme-p">
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="text-theme-lc text-sm">{blog.summary}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-theme-lc">
                  <span className="muted-chip rounded-full px-3 py-1">
                    {blog.readingTimeMinutes || 1} min read
                  </span>
                  {blog.publishedAt && (
                    <span className="muted-chip rounded-full px-3 py-1">
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                  {blog.tags?.length ? (
                    <span className="muted-chip rounded-full px-3 py-1">
                      {blog.tags.slice(0, 3).join(", ")}
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-theme-lc">No posts yet.</p>
        )}
      </div>
    </section>
  );
}

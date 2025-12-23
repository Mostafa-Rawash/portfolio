import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBlogBySlug } from "../services/api.js";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchBlogBySlug(slug)
      .then((data) => {
        if (isMounted) {
          setBlog(data);
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
  }, [slug]);

  if (isLoading) {
    return (
      <section className="container mx-auto pt-16 pb-12">
        <div className="section-shell">
          <p className="text-theme-lc">Loading post...</p>
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="container mx-auto pt-16 pb-12">
        <div className="section-shell space-y-4">
          <p className="text-theme-lc">Post not found.</p>
          <Link to="/blogs" className="text-theme-p">
            Back to blogs
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto pt-16 pb-12">
      <div className="section-shell space-y-6">
        <div className="space-y-2">
          <Link to="/blogs" className="text-theme-p text-sm">
            ← Back to blogs
          </Link>
          <h1 className="text-3xl lg:text-5xl font-black text-theme-tc">{blog.title}</h1>
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
                {blog.tags.join(", ")}
              </span>
            ) : null}
          </div>
        </div>

        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-72 w-full rounded-3xl object-cover"
            loading="lazy"
          />
        )}

        {blog.contentHtml ? (
          <div
            className="max-w-none text-theme-tc leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
          />
        ) : (
          <p className="text-theme-lc whitespace-pre-line">{blog.contentText}</p>
        )}
      </div>
    </section>
  );
}

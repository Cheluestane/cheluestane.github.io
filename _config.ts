import lume from "lume/mod.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";

const site = lume({
  src: "./",
});

site.use(slugifyUrls());

site.copy("CNAME");
site.copy("styles.css");
site.copy(
  [".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm"],
);

export default site;

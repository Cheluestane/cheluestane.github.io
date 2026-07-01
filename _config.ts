import lume from "lume/mod.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";

const site = lume({
  src: "./",
});

site.use(slugifyUrls());

site.copy("styles.css");
site.copy(
  [".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm", ".mov"],
);

export default site;

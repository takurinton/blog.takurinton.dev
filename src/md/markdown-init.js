/**
 * @todo replace to some kind of interface or ...??
 */
export class MarkdownInit {
  FRONTMATTER = /---\n([\s\S]*?)\n---\n\n([\s\S]*)/;
  FRONTMATTER_LIST =
    /id:([\s\S]*)\ntitle:([\s\S]*)\ndescription:([\s\S]*)\ncreated_at:([\s\S]*)/;

  constructor(md) {
    this.md = md.match(this.FRONTMATTER);
    this.frontmatter = this.md[1];
    this.content = this.md[2];
    this.frontmatterList = this.frontmatter.match(this.FRONTMATTER_LIST);
  }

  getContent() {
    return this.content;
  }

  getId() {
    return this.frontmatterList[1];
  }

  getTitle() {
    return this.frontmatterList[2];
  }

  getDescription() {
    return this.frontmatterList[3];
  }

  getCreatedAt() {
    return this.frontmatterList[4];
  }
}

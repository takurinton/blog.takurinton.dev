#[derive(Debug, PartialEq)]
pub enum Token {
    Heading { level: usize, content: String },
    // TODO: ネストできるようにする
    // MEMO: List と ListItem わけた方がいいかも？
    ListItem(Vec<Token>),
    OrderedList(Vec<String>),
    Bold(String),
    Italic(String),
    Link { text: String, url: String },
    CodeBlock { language: String, content: String },
    InlineCode(String),
    Paragraph(Vec<Token>),
    BlockQuote(Vec<Token>),
    Image { src: String, alt: String },
    Break,
    Empty,
    Text(String),

    // === ここから下はカスタムのシンタックス ===
    LinkCard(String),
    Twitter(String),
}

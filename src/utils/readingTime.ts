export function calculateReadingTime(content: string): number {
  // 移除 Markdown 语法和 HTML 标签
  const plainText = content
    .replace(/[#*`_~\[\]()]/g, '') // 移除 Markdown 语法
    .replace(/<[^>]*>/g, '') // 移除 HTML 标签
    .replace(/\s+/g, ' ') // 将多个空格替换为单个空格
    .trim();

  // 计算中文字数（包括标点符号）
  const chineseCharCount = (plainText.match(/[\u4e00-\u9fa5，。！？；：""''（）【】《》、]/g) || []).length;
  
  // 计算英文单词数
  const englishWordCount = (plainText.match(/[a-zA-Z]+/g) || []).length;
  
  // 假设：
  // - 中文阅读速度：每分钟 300 字
  // - 英文阅读速度：每分钟 200 词
  const readingTime = Math.ceil((chineseCharCount / 300) + (englishWordCount / 200));
  
  return Math.max(1, readingTime); // 至少返回 1 分钟
} 
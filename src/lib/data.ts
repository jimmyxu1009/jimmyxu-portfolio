import type { Project, FAQ, ToolStack, GalleryCategory } from "@/types";

export const siteName = "许英杰";
export const siteEmail = "xuyingjie856@gmail.com";
export const siteSlogan = "一起创造，不凡之物";

export const navLinks = [
  { label: "首页", href: "/" },
  { label: "关于我", href: "#about" },
  { label: "作品", href: "#work" },
  { label: "问题", href: "#faq" },
  { label: "联系我", href: "#contact" },
];

export const projects: Project[] = [
  {
    id: "feijidazhan",
    title: "飞机大战",
    image: "/images/work/feijidazhan.png",
    tags: ["Game"],
    link: "/feijidazhan",
    techs: ["HTML5 Canvas", "JavaScript", "Game Design", "Mobile Friendly"],
    description: "基于 HTML5 Canvas 的横版射击游戏，支持移动端触控操作，包含粒子特效与闯关机制。",
  },
  {
    id: "short-story-1",
    title: "短篇实验·壹",
    image: "/images/story1.png",
    tags: ["小说"],
    hideTitle: true,
    techs: ["金手指", "逆袭", "爽文", "鉴宝"],
    description: "短篇故事创作实验，融合多种网文叙事手法。",
  },
  {
    id: "xiaoshuo-1",
    title: "长篇连载·末世",
    image: "/images/novel1.jpg",
    tags: ["小说"],
    link: "https://fanqienovel.com/page/7630405786795002904?enter_from=search",
    hideTitle: true,
    techs: ["末世", "重生", "系统"],
    description: "末世题材长篇连载小说，已上线番茄小说平台。",
  },
];

export const filterTags = ["Game", "Web", "小说"];

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "目前接单吗？",
    answer: "当然！欢迎通过邮箱联系我，讨论你的项目需求。无论是 Web 前端开发、AI 工具集成还是创意交互项目，我都会认真对待每一个合作机会。",
  },
  {
    id: "2",
    question: "擅长什么方向？",
    answer: "Web 前端开发、Canvas 游戏开发、交互式动画、响应式网站设计，以及 AI 工具集成与工作流优化。我尤其擅长将 AI 能力融入前端应用，创造出更有智能感的用户体验。",
  },
  {
    id: "3",
    question: "用什么技术栈？",
    answer: "React / Next.js, TypeScript, Tailwind CSS, Framer Motion, Node.js，以及各类 AI 工具如 Claude Code、Trae 等。我保持对新技术的敏感度，持续更新自己的工具链。",
  },
  {
    id: "4",
    question: "AI 在你的工作中扮演什么角色？",
    answer: "AI 是我最重要的协作伙伴。我用 AI 加速原型设计、优化代码质量、生成内容创意、自动化重复工作。我认为 AI 不是替代者，而是创造力的放大器。",
  },
];

export const galleryCategories: GalleryCategory[] = [
  {
    id: "life",
    label: "生活",
    items: [
      { id: "life-1", type: "image" as const, src: "/images/feilada.jpg", alt: "飞拉达" },
      { id: "life-4", type: "image" as const, src: "/images/zibo.jpg", alt: "淄博" },
    ],
  },
  {
    id: "handmade",
    label: "手工",
    items: [
      { id: "hm-1", type: "image" as const, src: "/images/pintu1.jpg", alt: "拼图" },
    ],
  },
];

export const toolStack: ToolStack[] = [
  {
    name: "Claude Code",
    category: "AI 编程",
    description: "AI 驱动的前端开发助手",
  },
  {
    name: "Trae",
    category: "AI 编程",
    description: "智能代码补全与重构",
  },
  {
    name: "Nano Banana",
    category: "AI 工具",
    description: "轻量级 AI 应用工具",
  },
  {
    name: "Cherry Studio",
    category: "AI 工具",
    description: "AI 创意工作台",
  },
  {
    name: "Prompt Engineering",
    category: "AI 技能",
    description: "提示词工程与优化",
  },
  {
    name: "AI Workflow",
    category: "AI 技能",
    description: "AI 协作流程设计",
  },
  {
    name: "Cursor",
    category: "AI 编程",
    description: "AI 原生代码编辑器",
  },
  {
    name: "ChatGPT",
    category: "AI 工具",
    description: "通用 AI 对话与内容生成",
  },
];

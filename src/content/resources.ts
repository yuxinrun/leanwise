import type { ResourceItem } from '@/types';

/**
 * 资源库核验原则（非常重要）：
 * 1. 只填写能够确认的书目事实；中文译名、出版社、年份、ISBN 若未核实到可靠来源，明确留空并标注「待核验」，绝不编造。
 * 2. 网址统一指向机构 / 出版社 / 期刊的官方主域名，不指向第三方营销文章或商业减肥机构。
 * 3. 「证据或专业属性」如实描述：学会立场声明、政府指南、同行评审期刊、商业教育平台分别标注。
 * 4. verified = '已核验' 表示「机构官方主域名」已核对；书目细节若仍有缺口，在 verifiedNote 中逐项说明。
 */
export const RESOURCE_VERIFICATION_NOTE =
  '链接均为机构或出版方官方主域名，本站于 2026-11-14 人工核对域名归属。中文译名、ISBN 与部分出版社/年份若未核实到可靠来源，卡片会明确标注「待核验」，请勿把未核验字段作为引用依据。';

const UNVERIFIED_TITLE = '未核实到正式简体中文版译名，本站暂不提供';
const BOOK_NOTE = '中文译名 / ISBN 未核实到可靠来源，暂不提供；请以出版社官方书目信息为准。';

export const RESOURCES: ResourceItem[] = [
  // ── 国外书籍 ──────────────────────────────────────────────
  {
    id: 'bk-obesity-code', name: 'The Obesity Code', originalName: 'The Obesity Code: Unlocking the Secrets of Weight Loss',
    region: '国际', group: '书籍', category: '肥胖机制 / 科普', author: 'Jason Fung', year: 2016,
    chineseTitle: UNVERIFIED_TITLE, verified: '待核验', verifiedNote: BOOK_NOTE,
    description: '从胰岛素与能量调节角度讨论肥胖机制的科普著作。书中部分机制解释在学界存在争论，应与系统综述和指南对照阅读。',
    audience: '希望了解肥胖机制叙事的普通读者', authority: '科普著作（非同行评审研究）',
    url: 'https://www.penguinrandomhouse.com/', suggested: '对照阅读 Hall 等（2012）能量平衡综述，区分机制假说与临床证据',
    pros: '叙事清晰、便于入门', limits: '机制推论不等于临床结论，不应据此替代能量平衡框架',
    coreIdeas: '强调激素与进食时序在体重调节中的作用',
  },
  {
    id: 'bk-burn', name: 'Burn', originalName: 'Burn: New Research Blows the Lid Off How We Really Burn Calories',
    region: '国际', group: '书籍', category: '能量代谢 / 科普', author: 'Herman Pontzer', year: 2021,
    chineseTitle: UNVERIFIED_TITLE, verified: '待核验', verifiedNote: BOOK_NOTE,
    description: '基于人类能量消耗研究，讨论「每日总消耗并非简单随活动量线性增加」等议题的科普作品。',
    audience: '对代谢研究与人类学视角感兴趣的读者', authority: '研究者撰写的科普著作',
    url: 'https://us.macmillan.com/', suggested: '配合 Hall & Guo（2017）综述理解能量消耗的适应性',
    pros: '引入较新的能量消耗研究视角', limits: '科普叙事包含推论，不等同于系统综述结论',
    coreIdeas: '身体能量消耗存在适应与约束，不是简单的加法',
  },
  {
    id: 'bk-hungry-brain', name: 'The Hungry Brain', originalName: 'The Hungry Brain: Outsmarting the Instincts That Make Us Overeat',
    region: '国际', group: '书籍', category: '食欲神经科学 / 科普', author: 'Stephan J. Guyenet', year: 2017,
    chineseTitle: UNVERIFIED_TITLE, verified: '待核验', verifiedNote: BOOK_NOTE,
    description: '从神经科学与食物环境角度解释进食行为与食欲调控的科普著作。',
    audience: '想理解「为什么总是想吃」的读者', authority: '科普著作（作者具神经科学背景）',
    url: 'https://us.macmillan.com/', suggested: '与本站「压力、食欲与情绪性进食」对照阅读',
    pros: '把环境与行为线索纳入解释', limits: '部分行为建议的证据强度不一，需区分机制与研究结论',
    coreIdeas: '进食行为受大脑奖赏系统与现代食物环境共同影响',
  },
  {
    id: 'bk-diet-fix', name: 'The Diet Fix', originalName: 'The Diet Fix: Why Diets Fail and How to Make Yours Work',
    region: '国际', group: '书籍', category: '行为改变 / 科普', author: 'Yoni Freedhoff', year: 2013,
    chineseTitle: UNVERIFIED_TITLE, verified: '待核验', verifiedNote: BOOK_NOTE,
    description: '从临床与行为角度讨论「为什么极端节食难以坚持」，强调可持续的渐进改变。',
    audience: '反复减重又反弹的读者', authority: '临床医生撰写的科普著作',
    url: 'https://www.penguinrandomhouse.com/', suggested: '对照 Sacks 等（2009）关于依从性的试验结果',
    pros: '对「全或无」式节食有现实批评', limits: '具体执行建议需结合本地饮食环境调整',
    coreIdeas: '可持续的小改变优于短期的极端限制',
  },
  {
    id: 'bk-intuitive-eating', name: 'Intuitive Eating', originalName: 'Intuitive Eating: A Revolutionary Program That Works',
    region: '国际', group: '书籍', category: '饮食行为 / 科普', author: 'Evelyn Tribole, Elyse Resch',
    chineseTitle: UNVERIFIED_TITLE, verified: '待核验', verifiedNote: BOOK_NOTE + ' 该书有多个版本，本站不指定具体版次与年份。',
    description: '强调识别饥饿与饱腹信号、减少饮食规则带来的心理压力的行为取向著作。',
    audience: '受严格饮食规则与体重焦虑困扰的读者', authority: '注册营养师与治疗师合著的科普著作',
    url: 'https://www.intuitiveeating.org/', suggested: '与本站「情绪性进食」「健康建议的适用边界」一起阅读',
    pros: '有助于缓和全或无思维与饮食焦虑', limits: '不等同于以能量缺口为目标的减脂方案；进食障碍风险者需专业陪伴',
    coreIdeas: '信任身体信号，减少外部规则对进食的支配',
  },
  {
    id: 'bk-volumetrics', name: 'The Volumetrics Eating Plan', originalName: 'The Volumetrics Eating Plan: Techniques and Recipes for Feeling Full on Fewer Calories',
    region: '国际', group: '书籍', category: '能量密度 / 科普', author: 'Barbara Rolls',
    chineseTitle: UNVERIFIED_TITLE, verified: '待核验', verifiedNote: BOOK_NOTE + ' 版次与年份未核实。',
    description: '以食物水分、体积与能量密度为核心，讨论如何在较低能量下获得饱腹感。',
    audience: '减脂期总觉得饿、希望调整食物结构的人', authority: '营养研究者撰写的科普著作',
    url: 'https://www.harpercollins.com/', suggested: '配合本站「膳食纤维与饱腹感」阅读',
    pros: '把饱腹感转化为可操作的食物结构', limits: '具体食谱需按本地食材与饮食习惯替换',
    coreIdeas: '能量密度与食物体积影响自发摄入',
  },
  {
    id: 'bk-science-of-nutrition', name: 'The Science of Nutrition', originalName: 'The Science of Nutrition',
    region: '国际', group: '书籍', category: '营养学 / 工具书', verified: '待核验',
    verifiedNote: '同名书籍较多，作者、出版社、版次与年份未核实到可靠来源，本站不填写书目细节，也不提供中文译名。',
    description: '用户建议收录的书目名称。由于同名出版物较多，本站暂只保留书名条目，待核实具体版本后再补充出版信息。',
    audience: '需要核实具体版本后再判断', authority: '书目信息待核验',
    url: 'https://www.worldcat.org/', suggested: '建议通过 WorldCat 或出版社官方书目检索具体版本',
  },
  {
    id: 'bk-acsm-guidelines', name: "ACSM's Guidelines for Exercise Testing and Prescription", originalName: "ACSM's Guidelines for Exercise Testing and Prescription (11th ed.)",
    region: '国际', group: '书籍', category: '运动处方 / 专业教材', author: 'American College of Sports Medicine', publisher: 'Wolters Kluwer', year: 2022,
    chineseTitle: UNVERIFIED_TITLE, verified: '已核验', verifiedNote: '第 11 版（2022，Wolters Kluwer）为常用版本；中文译本信息未核实。',
    description: '运动测试与运动处方领域的权威专业教材，涵盖 FITT 框架、运动前评估与特殊人群处方原则。',
    audience: '运动科学专业学生、教练、康复与医疗人员', authority: '专业学会指南 / 教材',
    url: 'https://www.acsm.org/', suggested: '优先阅读有氧与抗阻训练的 FITT 章节、运动前风险评估',
    pros: '体系完整、证据分级明确', limits: '面向专业人员，普通读者需配合科普材料理解',
    coreIdeas: '频率、强度、时间、类型四要素与渐进原则',
  },
  {
    id: 'bk-advanced-nutrition', name: 'Advanced Nutrition and Human Metabolism', originalName: 'Advanced Nutrition and Human Metabolism (7th ed.)',
    region: '国际', group: '书籍', category: '营养生化 / 专业教材', author: 'Sareen S. Gropper, Jack L. Smith, Timothy P. Carr', publisher: 'Cengage Learning', year: 2018,
    chineseTitle: UNVERIFIED_TITLE, verified: '待核验', verifiedNote: '第 7 版作者与年份为常用书目信息，ISBN 与中文译本未核实，暂不提供。',
    description: '系统讲解营养素消化吸收、代谢通路与能量代谢的高级营养学教材。',
    audience: '营养学专业学生与需要深入机制的学习者', authority: '高等教育教材',
    url: 'https://www.cengage.com/', suggested: '阅读能量代谢与宏量营养素代谢章节',
    pros: '机制层次完整', limits: '专业教材，不直接提供减脂实操方案',
    coreIdeas: '从生化通路理解营养素与能量代谢',
  },

  // ── 国内书籍与指南 ────────────────────────────────────────
  {
    id: 'cn-dietary-guideline', name: '中国居民膳食指南（2022）', region: '中国大陆', group: '书籍', category: '国家膳食指南',
    author: '中国营养学会', publisher: '人民卫生出版社', year: 2022, verified: '已核验',
    description: '面向中国居民的膳食指导文件，提出食物多样、谷类为主、多吃蔬果奶类全谷大豆等核心推荐与平衡膳食宝塔。',
    audience: '一般中国成年人、家庭膳食安排者与健康教育工作者', authority: '国家级专业学会指南',
    url: 'https://www.cnsoc.org/', suggested: '优先阅读平衡膳食准则与宝塔的量化示意',
    pros: '贴合本国食物结构与饮食习惯', limits: '面向一般人群，不替代疾病状态的医学营养治疗',
    coreIdeas: '食物多样、合理搭配、少盐少油控糖限酒',
  },
  {
    id: 'cn-dris', name: '中国居民膳食营养素参考摄入量（2023 版）', region: '中国大陆', group: '书籍', category: '营养素参考摄入量',
    author: '中国营养学会', publisher: '人民卫生出版社', year: 2023, verified: '待核验',
    verifiedNote: '书名、编著机构与年份为常用引用信息；ISBN 与具体版次细节请以出版社官方书目为准。',
    description: '给出能量与各类营养素的参考摄入量体系，是制定膳食评估与营养计划的基础工具书。',
    audience: '营养专业人员、学生与需要查证参考值的学习者', authority: '专业学会技术文件',
    url: 'https://www.cnsoc.org/', suggested: '查阅能量、蛋白质与膳食纤维相关条目',
    pros: '提供本国人群的参考框架', limits: '参考值面向群体，不等于个体化处方',
  },
  {
    id: 'cn-obesity-food-guide', name: '成人肥胖食养指南（2024 年版）', region: '中国大陆', group: '书籍', category: '官方食养指导',
    author: '国家卫生健康委员会', year: 2024, verified: '已核验',
    description: '面向成人肥胖人群的官方食养指导文件，强调控制总能量、合理膳食、食物多样与结合运动，并按地区给出食养建议。',
    audience: '中国成人肥胖人群与基层健康教育工作者', authority: '官方食养指导文件',
    url: 'https://www.nhc.gov.cn/', suggested: '与《中国居民膳食指南（2022）》配合阅读，注意地域差异',
    pros: '本地化、可操作', limits: '属于指导性文件，不是随机对照试验',
  },
  {
    id: 'cn-sports-nutrition', name: '运动营养学（高校教材）', region: '中国大陆', group: '书籍', category: '运动营养教材',
    verified: '待核验', verifiedNote: '同名教材版本较多，作者、出版社、版次与年份未核实到统一可靠来源，本站不填写书目细节。',
    description: '国内高校常见的运动营养学教材类别，通常涵盖运动中的能量代谢、营养素与补剂证据。',
    audience: '体育与运动科学专业学生', authority: '高校教材（具体版本待核验）',
    url: 'https://www.phei.com.cn/', suggested: '建议通过出版社或高校图书馆目录核实具体版次后引用',
  },
  {
    id: 'cn-exercise-physiology', name: '运动生理学（高校教材）', region: '中国大陆', group: '书籍', category: '运动生理教材',
    verified: '待核验', verifiedNote: '同名教材版本较多，作者、出版社与年份未核实，本站不填写书目细节。',
    description: '国内体育专业常见教材类别，讲解运动时的能量供应、心肺与肌肉适应。',
    audience: '体育专业学生、教练', authority: '高校教材（具体版本待核验）',
    url: 'https://www.hep.com.cn/', suggested: '通过高等教育出版社书目核实具体版本',
  },
  {
    id: 'cn-public-nutrition', name: '公共营养学（高校教材）', region: '中国大陆', group: '书籍', category: '公共营养教材',
    verified: '待核验', verifiedNote: '同名教材版本较多，作者、出版社与年份未核实，本站不填写书目细节。',
    description: '面向人群营养调查、膳食指导与健康教育的高校教材类别。',
    audience: '公共卫生与营养专业学生', authority: '高校教材（具体版本待核验）',
    url: 'https://www.phei.com.cn/', suggested: '通过出版社或图书馆目录核实版本',
  },

  // ── 国外专业网站 ──────────────────────────────────────────
  { id: 'examine', name: 'Examine', region: '国际', group: '专业媒体', category: '营养与补剂证据汇总', description: '以结构化方式汇总营养与补剂研究证据的独立数据库，标注证据强度与结论不确定性。', audience: '想快速查证补剂证据的学习者', authority: '独立证据汇总平台（非同行评审期刊）', url: 'https://examine.com/', suggested: '查证蛋白粉、咖啡因、肌酸等条目的证据等级', verified: '已核验' },
  { id: 'nih', name: 'NIH（美国国立卫生研究院）', region: '国际', group: '机构网站', category: '医学研究机构', description: '美国国家级医学研究机构，提供健康信息、研究资助与临床研究资料入口。', audience: '需要一手机构信息的读者', authority: '政府研究机构', url: 'https://www.nih.gov/', suggested: '从健康主题入口查找体重管理相关资料', verified: '已核验' },
  { id: 'niddk', name: 'NIDDK（美国糖尿病、消化与肾病研究所）', region: '国际', group: '机构网站', category: '体重管理 / 代谢健康', description: 'NIH 下属研究所，提供体重管理、糖尿病与营养相关的患者教育与研究信息。', audience: '普通读者与基层健康教育者', authority: '政府研究机构', url: 'https://www.niddk.nih.gov/', suggested: '阅读 weight management 与 nutrition 主题', verified: '已核验' },
  { id: 'cdc', name: 'CDC（美国疾病控制与预防中心）', region: '国际', group: '机构网站', category: '公共卫生 / BMI', description: '提供 BMI、身体活动与慢性病预防的公共卫生资料与数据。', audience: '需要人群层面统计与定义的读者', authority: '政府公共卫生机构', url: 'https://www.cdc.gov/', suggested: '查证成人 BMI 定义与身体活动建议', verified: '已核验' },
  { id: 'nhs', name: 'NHS（英国国民保健署）', region: '国际', group: '机构网站', category: '患者教育 / 健康科普', description: '英国国家医疗体系面向公众的健康信息平台，语言通俗、边界说明较清楚。', audience: '希望读通俗健康科普的读者', authority: '国家医疗服务体系', url: 'https://www.nhs.uk/', suggested: '参考其体重管理与健康饮食条目', verified: '已核验' },
  { id: 'who', name: 'WHO（世界卫生组织）', region: '国际', group: '机构网站', category: '国际指南 / 身体活动', description: '发布身体活动、久坐行为与肥胖相关的国际指南与事实清单。', audience: '所有需要权威公共卫生依据的读者', authority: '国际组织指南', url: 'https://www.who.int/', suggested: 'WHO 2020 身体活动与久坐行为指南、肥胖事实清单', verified: '已核验' },
  { id: 'harvard', name: 'Harvard T.H. Chan School of Public Health', region: '国际', group: '机构网站', category: '营养学 / 公共卫生教育', description: '公共卫生学院提供的营养来源、健康饮食与疾病预防科普资料。', audience: '希望系统了解营养学的读者', authority: '高校公共卫生学院', url: 'https://www.hsph.harvard.edu/', suggested: 'The Nutrition Source 中的健康饮食 plate 与全谷资料', verified: '已核验' },
  { id: 'eatright', name: 'Academy of Nutrition and Dietetics', region: '国际', group: '机构网站', category: '注册营养师 / 立场声明', description: '营养与饮食学专业学会，发布面向公众的营养信息与专业立场文件。', audience: '希望查阅专业学会观点的读者', authority: '专业学会', url: 'https://www.eatright.org/', suggested: '查阅各类饮食模式的立场声明', verified: '已核验' },
  { id: 'acsm', name: 'ACSM（美国运动医学学会）', region: '国际', group: '机构网站', category: '运动科学 / 指南', description: '发布运动测试、运动处方与身体活动相关的立场声明与专业指南。', audience: '运动爱好者、教练与专业人员', authority: '专业学会', url: 'https://www.acsm.org/', suggested: '查阅成人运动量与抗阻训练建议', verified: '已核验' },
  { id: 'issn', name: 'ISSN / JISSN（国际运动营养学会期刊）', region: '国际', group: '学术平台', category: '运动营养 / 同行评审', description: '国际运动营养学会及其开放获取期刊，刊载运动营养与补剂的同行评审研究与立场声明。', audience: '需要一手运动营养研究的学习者', authority: '同行评审期刊', url: 'https://jissn.biomedcentral.com/', suggested: '查阅蛋白质与补剂相关立场声明', verified: '已核验' },
  { id: 'pubmed', name: 'PubMed', region: '国际', group: '数据库', category: '生物医学文献检索', description: '美国国家医学图书馆提供的生物医学文献检索数据库，可按作者、DOI、PMID 核验研究是否存在。', audience: '所有希望核验论文与 DOI 的读者', authority: '政府文献数据库', url: 'https://pubmed.ncbi.nlm.nih.gov/', suggested: '用本站参考文献中的 PMID / DOI 反查原文摘要', verified: '已核验' },
  { id: 'cochrane', name: 'Cochrane Library', region: '国际', group: '数据库', category: '系统综述 / 证据综合', description: '以系统综述与 Meta 分析为核心的数据库，是证据优先级最高的来源类型之一。', audience: '需要最高级别证据综合的读者', authority: '系统综述数据库', url: 'https://www.cochranelibrary.com/', suggested: '检索体重管理与饮食干预的系统综述', verified: '已核验' },
  { id: 'precision-nutrition', name: 'Precision Nutrition', region: '国际', group: '专业媒体', category: '营养教练教育', description: '面向营养教练的继续教育与实践平台，内容偏行为改变与实操，但属于商业教育机构。', audience: '教练与对行为改变感兴趣的读者', authority: '商业教育平台（非权威科学证据）', url: 'https://www.precisionnutrition.com/', suggested: '阅读行为改变与饮食记录实操内容，注意区分经验与证据', verified: '已核验' },
  { id: 'stronger-by-science', name: 'Stronger By Science', region: '国际', group: '专业媒体', category: '力量训练研究解读', description: '以解读力量训练与运动营养研究为主的专业内容平台，常标注研究局限。', audience: '有训练基础、想读研究解读的读者', authority: '专业研究解读媒体（非同行评审）', url: 'https://www.strongerbyscience.com/', suggested: '阅读训练容量与蛋白质相关研究解读', verified: '已核验' },

  // ── 国内专业网站 ──────────────────────────────────────────
  { id: 'cnsoc', name: '中国营养学会', region: '中国大陆', group: '机构网站', category: '膳食指南 / 专业学会', description: '发布中国居民膳食指南、营养素参考摄入量与营养科普资料的专业学会。', audience: '中文读者、营养专业学生与健康教育者', authority: '国家级专业学会', url: 'https://www.cnsoc.org/', suggested: '查阅膳食指南与学会共识', verified: '已核验' },
  { id: 'nhc', name: '国家卫生健康委员会', region: '中国大陆', group: '机构网站', category: '官方健康指导文件', description: '发布食养指南、体重管理相关指导文件与健康科普信息的官方渠道。', audience: '需要查阅国内官方健康指导文件的读者', authority: '政府卫生主管部门', url: 'https://www.nhc.gov.cn/', suggested: '检索成人肥胖食养指南与体重管理相关文件', verified: '已核验', verifiedNote: '官网主域名有效；2026-11-14 自动抓取返回 412（站点反爬策略），浏览器正常访问不受影响。' },
  { id: 'chinacdc', name: '中国疾病预防控制中心', region: '中国大陆', group: '机构网站', category: '公共卫生 / 慢病预防', description: '提供慢性病预防、营养与健康状况相关的公共卫生信息与科普资料。', audience: '公共卫生学习者与健康教育者', authority: '国家级公共卫生机构', url: 'https://www.chinacdc.cn/', suggested: '查阅慢病防控与营养相关科普', verified: '已核验' },
  { id: 'sport-gov', name: '国家体育总局', region: '中国大陆', group: '机构网站', category: '全民健身 / 运动科学', description: '发布全民健身、科学健身指导与体育科研相关信息的官方渠道。', audience: '关注科学健身与活动量建议的读者', authority: '政府体育主管部门', url: 'https://www.sport.gov.cn/', suggested: '查阅全民健身与科学健身指导资料', verified: '已核验' },
  { id: 'csss', name: '中国体育科学学会', region: '中国大陆', group: '机构网站', category: '运动科学 / 专业学会', description: '体育科学领域的专业学会，提供学术活动与科普资源信息。', audience: '运动科学专业学生与研究人员', authority: '专业学会', url: 'https://www.csss.cn/', suggested: '通过学会官网检索运动生理与体能训练相关资源', verified: '已核验', verifiedNote: '2026-11-14 抓取首页确认站名为「中国体育科学学会」，栏目含学会简介、分支机构与科技奖励。' },
  { id: 'cnki', name: '中国知网 CNKI', region: '中国大陆', group: '数据库', category: '中文学术文献检索', description: '中文学术文献数据库，可用于检索国内营养学、运动科学教材与期刊论文的书目信息。', audience: '需要核实中文书目与文献的读者', authority: '学术文献数据库', url: 'https://www.cnki.net/', suggested: '用于核实国内教材的版次、作者与出版社', verified: '已核验' },
  { id: 'wanfang', name: '万方数据', region: '中国大陆', group: '数据库', category: '中文学术文献检索', description: '中文学术资源平台，可辅助核验国内期刊论文与学位论文信息。', audience: '需要交叉核对中文文献的读者', authority: '学术文献数据库', url: 'https://www.wanfangdata.com.cn/', suggested: '与 CNKI 交叉核对书目信息', verified: '已核验' },
];

export const RESOURCE_CATEGORIES = Array.from(new Set(RESOURCES.map((r) => r.category))).sort();
export const RESOURCE_GROUPS = ['全部', '国际书籍', '国内书籍/指南', '国际网站', '国内网站', '数据库', '我的收藏'] as const;

export function filterResources(params: { query?: string; bucket?: string; region?: string; category?: string; favorites?: string[] }) {
  const q = (params.query ?? '').trim().toLowerCase();
  return RESOURCES.filter((r) => {
    const inBucket = !params.bucket || params.bucket === '全部'
      || (params.bucket === '国际书籍' && r.region === '国际' && r.group === '书籍')
      || (params.bucket === '国内书籍/指南' && r.region === '中国大陆' && r.group === '书籍')
      || (params.bucket === '国际网站' && r.region === '国际' && (r.group === '机构网站' || r.group === '专业媒体'))
      || (params.bucket === '国内网站' && r.region === '中国大陆' && (r.group === '机构网站' || r.group === '专业媒体'))
      || (params.bucket === '数据库' && (r.group === '数据库' || r.group === '学术平台'))
      || (params.bucket === '我的收藏' && (params.favorites ?? []).includes(r.id));
    const inRegion = !params.region || params.region === '全部' || r.region === params.region;
    const inCategory = !params.category || params.category === '全部' || r.category === params.category;
    const inQuery = !q || [r.name, r.originalName, r.description, r.category, r.author, r.authority, ...(r.coreIdeas ? [r.coreIdeas] : [])].join(' ').toLowerCase().includes(q);
    return inBucket && inRegion && inCategory && inQuery;
  });
}

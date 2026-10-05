export type ProductLocale = "zh-Hant" | "zh-Hans";

export type ProductCopy = {
  finish: string;
  size: string;
  coverage: string;
  tag?: string;
  description: string;
  specs: string[];
};

export type ProductsUi = {
  htmlLang: string;
  country: string;
  countryAria: string;
  langHant: string;
  langHans: string;
  home: string;
  portfolio: string;
  contact: string;
  menu: string;
  heroKicker: string;
  heroTitle: string;
  heroBody: string;
  priceNoteUsd: string;
  priceNoteHkd: string;
  servicesKicker: string;
  servicesTitle: string;
  paintsKicker: string;
  paintsTitle: string;
  tilesKicker: string;
  tilesTitle: string;
  add: string;
  addAria: (brand: string, name: string) => string;
  materialsHkdHint: string;
  tradeKicker: string;
  tradeBody: string;
  applicationKicker: string;
  applicationBody: string;
  deliveryKicker: string;
  deliveryBody: string;
  cart: string;
  cartEmpty: string;
  continueBrowsing: string;
  item: string;
  items: string;
  closeCart: string;
  openCart: (count: number) => string;
  subtotal: string;
  delivery: string;
  free: string;
  total: string;
  freeDeliveryHint: (amount: string) => string;
  name: string;
  phone: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  pay: string;
  redirecting: string;
  payNoteHkd: (min: string) => string;
  payNoteUsd: string;
  checkoutFail: string;
  checkoutStartFail: string;
  rights: string;
  terms: string;
  privacy: string;
  regionHk: string;
  regionUs: string;
};

const hantUi: ProductsUi = {
  htmlLang: "zh-Hant",
  country: "國家／地區",
  countryAria: "選擇國家以切換貨幣",
  langHant: "繁",
  langHans: "简",
  home: "首頁",
  portfolio: "作品",
  contact: "聯絡",
  menu: "開啟選單",
  heroKicker: "精選塗料與瓷磚",
  heroTitle: "給不甘於平凡的空間",
  heroBody:
    "我們供應自己項目指定的完成物料——傳統乳膠漆、手工石灰漿、碳負礦物漆，以及定義空間的瓷磚與石材。香港送貨，亦可安排專業施工。",
  priceNoteUsd:
    "以下設計套餐以美元結算；物料由香港以港幣發售——請改選香港方可訂購塗料與瓷磚。",
  priceNoteHkd: "設計套餐與物料均可以港幣結算。",
  servicesKicker: "設計服務",
  servicesTitle: "設計套餐",
  paintsKicker: "系列一 · 塗料",
  paintsTitle: "油漆與飾面",
  tilesKicker: "系列二 · 瓷磚與石材",
  tilesTitle: "瓷磚與石材",
  add: "加入",
  addAria: (brand, name) => `將 ${brand} ${name} 加入購物車`,
  materialsHkdHint: "物料以港幣發售——請改選香港",
  tradeKicker: "業界與設計師",
  tradeBody: "建築師與設計師可查詢業界價及項目對色。",
  applicationKicker: "施工",
  applicationBody:
    "石灰漿、石墨烯飾面與天然石材屬專業施工。可由本公司油漆及石匠報價現場視察、棚架與底處理。",
  deliveryKicker: "送貨",
  deliveryBody: "全港送貨約 2–3 個工作天。滿港幣 $2,000 免運。瓷磚樣板及業界批量可另議。",
  cart: "購物車",
  cartEmpty: "購物車是空的",
  continueBrowsing: "繼續瀏覽",
  item: "件",
  items: "件",
  closeCart: "關閉購物車",
  openCart: (count) => `開啟購物車，${count} 件商品`,
  subtotal: "小計",
  delivery: "運費",
  free: "免費",
  total: "合計",
  freeDeliveryHint: (amount) => `再加購 ${amount} 即可免運。`,
  name: "姓名",
  phone: "電話",
  namePlaceholder: "全名",
  phonePlaceholder: "+852 …",
  pay: "以 Stripe 安全付款",
  redirecting: "正在前往 Stripe…",
  payNoteHkd: (min) => `以 Stripe 信用卡付款。滿 ${min} 免運。`,
  payNoteUsd: "以 Stripe 信用卡付款 · 美國以美元計價。",
  checkoutFail: "結帳失敗",
  checkoutStartFail: "無法啟動 Stripe 結帳",
  rights: "版權所有",
  terms: "條款及細則",
  privacy: "私隱政策",
  regionHk: "香港",
  regionUs: "美國",
};

const hansUi: ProductsUi = {
  ...hantUi,
  htmlLang: "zh-Hans",
  country: "国家／地区",
  countryAria: "选择国家以切换货币",
  home: "首页",
  portfolio: "作品",
  contact: "联络",
  menu: "打开菜单",
  heroKicker: "精选涂料与瓷砖",
  heroTitle: "给不甘于平凡的空间",
  heroBody:
    "我们供应自己项目指定的完成材料——传统乳胶漆、手工石灰浆、碳负矿物漆，以及定义空间的瓷砖与石材。香港送货，亦可安排专业施工。",
  priceNoteUsd:
    "以下设计套餐以美元结算；材料由香港以港币发售——请改选香港方可订购涂料与瓷砖。",
  priceNoteHkd: "设计套餐与材料均可以港币结算。",
  servicesKicker: "设计服务",
  servicesTitle: "设计套餐",
  paintsKicker: "系列一 · 涂料",
  paintsTitle: "油漆与饰面",
  tilesKicker: "系列二 · 瓷砖与石材",
  tilesTitle: "瓷砖与石材",
  add: "加入",
  addAria: (brand, name) => `将 ${brand} ${name} 加入购物车`,
  materialsHkdHint: "材料以港币发售——请改选香港",
  tradeKicker: "业界与设计师",
  tradeBody: "建筑师与设计师可查询业界价及项目对色。",
  applicationKicker: "施工",
  applicationBody:
    "石灰浆、石墨烯饰面与天然石材属专业施工。可由本公司油漆及石匠报价现场视察、棚架与底处理。",
  deliveryKicker: "送货",
  deliveryBody: "全港送货约 2–3 个工作日。满港币 $2,000 免运。瓷砖样板及业界批量可另议。",
  cart: "购物车",
  cartEmpty: "购物车是空的",
  continueBrowsing: "继续浏览",
  closeCart: "关闭购物车",
  openCart: (count) => `打开购物车，${count} 件商品`,
  subtotal: "小计",
  delivery: "运费",
  free: "免费",
  total: "合计",
  freeDeliveryHint: (amount) => `再加购 ${amount} 即可免运。`,
  name: "姓名",
  phone: "电话",
  namePlaceholder: "全名",
  pay: "以 Stripe 安全付款",
  redirecting: "正在前往 Stripe…",
  payNoteHkd: (min) => `以 Stripe 信用卡付款。满 ${min} 免运。`,
  payNoteUsd: "以 Stripe 信用卡付款 · 美国以美元计价。",
  checkoutFail: "结账失败",
  checkoutStartFail: "无法启动 Stripe 结账",
  rights: "版权所有",
  terms: "条款及细则",
  privacy: "隐私政策",
  regionHk: "香港",
  regionUs: "美国",
};

export const PRODUCTS_UI: Record<ProductLocale, ProductsUi> = {
  "zh-Hant": hantUi,
  "zh-Hans": hansUi,
};

const hantCopy: Record<string, ProductCopy> = {
  "Edward Bulmer::Natural Paint": {
    finish: "天然顏料 · 手工研磨",
    size: "2.5 升罐",
    coverage: "約 11 平方米／2.5 升（兩遍）",
    tag: "稀有",
    description:
      "世上最矜貴的傳統油漆之一，以天然顏料研磨、植物樹脂調配。不含合成化學——顏色本身即是奢華。英國赫里福德郡小批量製作。",
    specs: ["植物樹脂", "手工研磨顏料", "零 VOC", "60+ 色"],
  },
  "San Marco::Stucco Veneziano": {
    finish: "威尼斯灰泥 · 拋光",
    size: "5 升套裝",
    coverage: "約 8 平方米／5 升（兩遍）",
    tag: "匠作",
    description:
      "源自 1962 年家族工房的正宗威尼斯灰泥。大理石粉與熟石灰分層批盪、拋光至乳膠漆無法模仿的深度。由本公司專人施工。",
    specs: ["大理石粉基底", "拋光飾面", "可呼吸", "批盪施工"],
  },
  "Novacolor::Plaster Art Mineral": {
    finish: "礦物灰泥 · 金屬層次",
    size: "4 升套裝",
    coverage: "約 6 平方米／4 升（兩遍）",
    tag: "意大利",
    description:
      "意大利礦物灰泥，帶隨光而變的金屬層次。精品酒店與藝廊常用——亦見於我們的酒店項目。",
    specs: ["礦物基底", "金屬光澤", "透氣", "手工批盪"],
  },
  "Farrow & Ball::Estate Emulsion": {
    finish: "全啞光",
    size: "2.5 升罐",
    coverage: "約 13 平方米／2.5 升（兩遍）",
    tag: "傳統",
    description:
      "英國傳統乳膠漆的典範。高顏料、低黏合劑，呈現深沉粉筆質感——令 Farrow & Ball 成為靜奢代名詞的飾面。",
    specs: ["水性", "低 VOC", "可擦拭", "132 色"],
  },
  "Farrow & Ball::Modern Emulsion": {
    finish: "耐用啞光 · 可擦洗",
    size: "2.5 升罐",
    coverage: "約 13 平方米／2.5 升（兩遍）",
    description:
      "Estate Emulsion 的耐用版本。先進樹脂技術提供可擦洗、抗刮飾面，同時保留標誌性深啞表面。",
    specs: ["水性", "可擦洗", "A 級濕磨", "132 色"],
  },
  "Little Greene::Intelligent Matt": {
    finish: "環保啞光 · 耐用",
    size: "2.5 升罐",
    coverage: "約 12 平方米／2.5 升（兩遍）",
    description:
      "英國最悠久裝飾油漆商的暢銷 intelligent 乳膠漆。比普通啞光更堅韌，同時完全透氣——專業油漆匠的首選。",
    specs: ["水性", "低 VOC", "透氣", "190 色"],
  },
  "Benjamin Moore::Aura Interior": {
    finish: "啞光 · Colour Lock 技術",
    size: "3.79 升罐",
    coverage: "約 28 平方米／3.79 升（兩遍）",
    description:
      "Benjamin Moore 旗艦。Colour Lock 技術在多數表面一層即可呈現濃郁、抗褪色色彩——香港高端裝修常用。",
    specs: ["水性", "Colour Lock", "自帶底漆", "3,500+ 色"],
  },
  "Bauwerk Colour::Limewash": {
    finish: "真石灰漿 · 礦物啞光",
    size: "3.5 升罐",
    coverage: "約 8 平方米／3.5 升（兩遍）",
    description:
      "瑞士熟石灰漿，柔軟絨面、隨時間加深。每遍獨一無二——我們庫存中最罕見的飾面。",
    specs: ["熟石灰", "天然抗菌", "透氣", "手工批盪"],
  },
  "Graphenstone::Ecosphere Matt": {
    finish: "石墨烯礦物 · 超低 VOC",
    size: "4 升罐",
    coverage: "約 25 平方米／4 升（兩遍）",
    description:
      "以石墨烯強化的石灰漆。固化時吸收二氧化碳、過濾空氣污染物，並持有世上最嚴格的環保認證。",
    specs: ["碳負", "石墨烯強化", "吸附污染物", "Cradle to Cradle"],
  },
  "Agata Blue::Lappato Bookmatch Slab": {
    finish: "石英岩 · 半拋光 lappato",
    size: "每片板",
    coverage: "對紋一對／板套",
    tag: "招牌",
    description:
      "Agata Blue 石英岩對紋大板，lappato 半拋光——兼具拋光石材深度與更溫潤觸感。藍灰紋理鏡像對稱，適合作雕塑感特色牆。",
    specs: ["天然石英岩", "Lappato 飾面", "對紋", "1200 × 2800 mm"],
  },
  "Bisazza::Gemmy Glass Mosaic": {
    finish: "玻璃馬賽克 · 手工",
    size: "每片（300 × 300 mm）",
    coverage: "約 0.09 平方米／片 · 約 11 片／平方米",
    description:
      "自 1959 年起於意大利手工製作的玻璃馬賽克。玻化玻璃的色彩深度非印刷瓷磚可比——香港頂級住宅特色牆常用。",
    specs: ["意大利手工", "玻化玻璃", "海事級", "150+ 色"],
  },
  "Calacatta::Marble — Bookmatched Slabs": {
    finish: "天然大理石 · 拋光",
    size: "每片（約 2.7 平方米）",
    coverage: "對紋一對／板",
    description:
      "真正卡拉拉 Calacatta 大理石，戲劇性灰紋是其傳奇所在。每片對紋成對，由本公司石匠負責加工與安裝。",
    specs: ["卡拉拉開採", "對紋", "拋光", "含加工"],
  },
  "Marazzi::Large-Format Porcelain": {
    finish: "緞面 · 1200 × 2780 mm",
    size: "每片（約 3.3 平方米）",
    coverage: "一片 · 約 3.3 平方米",
    tag: "意大利",
    description:
      "意大利大板瓷磚的標杆。通高連續石紋——我們酒店項目常用的無縫牆地處理。",
    specs: ["意大利製造", "修邊", "通體瓷", "室內外適用"],
  },
  "Atlas Concorde::Smart Architectural Tile": {
    finish: "啞光 · 石材效果",
    size: "每箱（約 1.44 平方米）",
    coverage: "每箱約 1.44 平方米",
    tag: "建築",
    description:
      "全球建築師指定的意大利技術瓷磚。超平整、色差可控、精準修邊，填縫可細至 1mm。",
    specs: ["意大利製造", "1mm 填縫", "防滑 R10", "通體"],
  },
  "Porcelanosa::Technical Porcelain": {
    finish: "啞光 · 木紋效果",
    size: "每箱（約 1.8 平方米）",
    coverage: "每箱約 1.8 平方米",
    tag: "西班牙",
    description:
      "西班牙最大瓷磚廠的木紋瓷磚。有實木溫暖、瓷磚耐久——無需打磨、上油，永不變形。",
    specs: ["西班牙製造", "木紋效果", "抗刮", "地暖適用"],
  },
  "Designer Terrazzo::Fior di Terrazzo": {
    finish: "水磨石 · 拋光",
    size: "每箱（約 1.44 平方米）",
    coverage: "每箱約 1.44 平方米",
    tag: "設計師",
    description:
      "當代水磨石，意大利大理石碎嵌入波特蘭水泥。每片獨一無二——紋理永不重複，正是重點。",
    specs: ["大理石碎水磨石", "手工澆鑄", "每片獨特", "拋光"],
  },
  "Accord Interiors::Design Consultation": {
    finish: "一對一設計諮詢 · 遠程或到店",
    size: "單次",
    coverage: "概念方向與物料建議",
    tag: "USD 500",
    description:
      "一對一設計諮詢——概念方向、物料建議，以及裝修或工程的清晰下一步。",
    specs: ["60–90 分鐘", "氛圍與物料方向", "書面下一步", "香港或遠程"],
  },
  "Accord Interiors::Design Package": {
    finish: "完整設計方案 · 項目簡報",
    size: "項目套餐",
    coverage: "空間規劃大綱與飾面建議",
    tag: "USD 700",
    description:
      "完整設計套餐——空間規劃大綱、飾面建議，以及裝修或工程的範圍提案。",
    specs: ["空間規劃大綱", "飾面短名單", "範圍提案", "可執行簡報"],
  },
};

const hansCopy: Record<string, ProductCopy> = {
  "Edward Bulmer::Natural Paint": {
    finish: "天然颜料 · 手工研磨",
    size: "2.5 升罐",
    coverage: "约 11 平方米／2.5 升（两遍）",
    tag: "稀有",
    description:
      "世上最矜贵的传统油漆之一，以天然颜料研磨、植物树脂调配。不含合成化学——颜色本身即是奢华。英国赫里福德郡小批量制作。",
    specs: ["植物树脂", "手工研磨颜料", "零 VOC", "60+ 色"],
  },
  "San Marco::Stucco Veneziano": {
    finish: "威尼斯灰泥 · 抛光",
    size: "5 升套装",
    coverage: "约 8 平方米／5 升（两遍）",
    tag: "匠作",
    description:
      "源自 1962 年家族工房的正宗威尼斯灰泥。大理石粉与熟石灰分层批荡、抛光至乳胶漆无法模仿的深度。由本公司专人施工。",
    specs: ["大理石粉基底", "抛光饰面", "可呼吸", "批荡施工"],
  },
  "Novacolor::Plaster Art Mineral": {
    finish: "矿物灰泥 · 金属层次",
    size: "4 升套装",
    coverage: "约 6 平方米／4 升（两遍）",
    tag: "意大利",
    description:
      "意大利矿物灰泥，带随光而变的金属层次。精品酒店与艺廊常用——亦见于我们的酒店项目。",
    specs: ["矿物基底", "金属光泽", "透气", "手工批荡"],
  },
  "Farrow & Ball::Estate Emulsion": {
    finish: "全哑光",
    size: "2.5 升罐",
    coverage: "约 13 平方米／2.5 升（两遍）",
    tag: "传统",
    description:
      "英国传统乳胶漆的典范。高颜料、低黏合剂，呈现深沉粉笔质感——令 Farrow & Ball 成为静奢代名词的饰面。",
    specs: ["水性", "低 VOC", "可擦拭", "132 色"],
  },
  "Farrow & Ball::Modern Emulsion": {
    finish: "耐用哑光 · 可擦洗",
    size: "2.5 升罐",
    coverage: "约 13 平方米／2.5 升（两遍）",
    description:
      "Estate Emulsion 的耐用版本。先进树脂技术提供可擦洗、抗刮饰面，同时保留标志性深哑表面。",
    specs: ["水性", "可擦洗", "A 级湿磨", "132 色"],
  },
  "Little Greene::Intelligent Matt": {
    finish: "环保哑光 · 耐用",
    size: "2.5 升罐",
    coverage: "约 12 平方米／2.5 升（两遍）",
    description:
      "英国最悠久装饰油漆商的畅销 intelligent 乳胶漆。比普通哑光更坚韧，同时完全透气——专业油漆匠的首选。",
    specs: ["水性", "低 VOC", "透气", "190 色"],
  },
  "Benjamin Moore::Aura Interior": {
    finish: "哑光 · Colour Lock 技术",
    size: "3.79 升罐",
    coverage: "约 28 平方米／3.79 升（两遍）",
    description:
      "Benjamin Moore 旗舰。Colour Lock 技术在多数表面一层即可呈现浓郁、抗褪色色彩——香港高端装修常用。",
    specs: ["水性", "Colour Lock", "自带底漆", "3,500+ 色"],
  },
  "Bauwerk Colour::Limewash": {
    finish: "真石灰浆 · 矿物哑光",
    size: "3.5 升罐",
    coverage: "约 8 平方米／3.5 升（两遍）",
    description:
      "瑞士熟石灰浆，柔软绒面、随时间加深。每遍独一无二——我们库存中最罕见的饰面。",
    specs: ["熟石灰", "天然抗菌", "透气", "手工批荡"],
  },
  "Graphenstone::Ecosphere Matt": {
    finish: "石墨烯矿物 · 超低 VOC",
    size: "4 升罐",
    coverage: "约 25 平方米／4 升（两遍）",
    description:
      "以石墨烯强化的石灰漆。固化时吸收二氧化碳、过滤空气污染物，并持有世上最严格的环保认证。",
    specs: ["碳负", "石墨烯强化", "吸附污染物", "Cradle to Cradle"],
  },
  "Agata Blue::Lappato Bookmatch Slab": {
    finish: "石英岩 · 半抛光 lappato",
    size: "每片板",
    coverage: "对纹一对／板套",
    tag: "招牌",
    description:
      "Agata Blue 石英岩对纹大板，lappato 半抛光——兼具抛光石材深度与更温润触感。蓝灰纹理镜像对称，适合作雕塑感特色墙。",
    specs: ["天然石英岩", "Lappato 饰面", "对纹", "1200 × 2800 mm"],
  },
  "Bisazza::Gemmy Glass Mosaic": {
    finish: "玻璃马赛克 · 手工",
    size: "每片（300 × 300 mm）",
    coverage: "约 0.09 平方米／片 · 约 11 片／平方米",
    description:
      "自 1959 年起于意大利手工制作的玻璃马赛克。玻化玻璃的色彩深度非印刷瓷砖可比——香港顶级住宅特色墙常用。",
    specs: ["意大利手工", "玻化玻璃", "海事级", "150+ 色"],
  },
  "Calacatta::Marble — Bookmatched Slabs": {
    finish: "天然大理石 · 抛光",
    size: "每片（约 2.7 平方米）",
    coverage: "对纹一对／板",
    description:
      "真正卡拉拉 Calacatta 大理石，戏剧性灰纹是其传奇所在。每片对纹成对，由本公司石匠负责加工与安装。",
    specs: ["卡拉拉开采", "对纹", "抛光", "含加工"],
  },
  "Marazzi::Large-Format Porcelain": {
    finish: "缎面 · 1200 × 2780 mm",
    size: "每片（约 3.3 平方米）",
    coverage: "一片 · 约 3.3 平方米",
    tag: "意大利",
    description:
      "意大利大板瓷砖的标杆。通高连续石纹——我们酒店项目常用的无缝墙地处理。",
    specs: ["意大利制造", "修边", "通体瓷", "室内外适用"],
  },
  "Atlas Concorde::Smart Architectural Tile": {
    finish: "哑光 · 石材效果",
    size: "每箱（约 1.44 平方米）",
    coverage: "每箱约 1.44 平方米",
    tag: "建筑",
    description:
      "全球建筑师指定的意大利技术瓷砖。超平整、色差可控、精准修边，填缝可细至 1mm。",
    specs: ["意大利制造", "1mm 填缝", "防滑 R10", "通体"],
  },
  "Porcelanosa::Technical Porcelain": {
    finish: "哑光 · 木纹效果",
    size: "每箱（约 1.8 平方米）",
    coverage: "每箱约 1.8 平方米",
    tag: "西班牙",
    description:
      "西班牙最大瓷砖厂的木纹瓷砖。有实木温暖、瓷砖耐久——无需打磨、上油，永不变形。",
    specs: ["西班牙制造", "木纹效果", "抗刮", "地暖适用"],
  },
  "Designer Terrazzo::Fior di Terrazzo": {
    finish: "水磨石 · 抛光",
    size: "每箱（约 1.44 平方米）",
    coverage: "每箱约 1.44 平方米",
    tag: "设计师",
    description:
      "当代水磨石，意大利大理石碎嵌入波特兰水泥。每片独一无二——纹理永不重复，正是重点。",
    specs: ["大理石碎水磨石", "手工浇铸", "每片独特", "抛光"],
  },
  "Accord Interiors::Design Consultation": {
    finish: "一对一设计咨询 · 远程或到店",
    size: "单次",
    coverage: "概念方向与物料建议",
    tag: "USD 500",
    description:
      "一对一设计咨询——概念方向、物料建议，以及装修或工程的清晰下一步。",
    specs: ["60–90 分钟", "氛围与物料方向", "书面下一步", "香港或远程"],
  },
  "Accord Interiors::Design Package": {
    finish: "完整设计方案 · 项目简报",
    size: "项目套餐",
    coverage: "空间规划大纲与饰面建议",
    tag: "USD 700",
    description:
      "完整设计套餐——空间规划大纲、饰面建议，以及装修或工程的范围提案。",
    specs: ["空间规划大纲", "饰面短名单", "范围提案", "可执行简报"],
  },
};

export const PRODUCT_COPY: Record<ProductLocale, Record<string, ProductCopy>> = {
  "zh-Hant": hantCopy,
  "zh-Hans": hansCopy,
};

export function localizeProductCopy<
  T extends {
    brand: string;
    name: string;
    finish: string;
    size: string;
    coverage: string;
    tag?: string;
    description: string;
    specs: string[];
  },
>(product: T, locale: ProductLocale): T {
  const copy = PRODUCT_COPY[locale][`${product.brand}::${product.name}`];
  if (!copy) return product;
  return { ...product, ...copy };
}

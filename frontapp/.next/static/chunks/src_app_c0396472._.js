(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/components/CategoryTabs.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CategoryTabs)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const categories = [
    {
        name: 'Vehicle repair',
        image: '/categories/Vehicle repair.png'
    },
    {
        name: 'Healthcare',
        image: '/categories/Healthcare.png'
    },
    {
        name: 'Carpenter',
        image: '/categories/Carpanter repair or install.png'
    },
    {
        name: 'Electrician',
        image: '/categories/Electrician service.png'
    },
    {
        name: 'Appliance repair',
        image: '/categories/Appliances repair.png'
    },
    {
        name: 'Home Cleaning',
        image: '/categories/Home cleaning.png'
    }
];
function CategoryTabs({ value = '', onChange }) {
    _s();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    const [stuck, setStuck] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const barRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryTabs.useEffect": ()=>setActive(value)
    }["CategoryTabs.useEffect"], [
        value
    ]);
    // Add header-like styling once it sticks to the top
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryTabs.useEffect": ()=>{
            if (!barRef.current) return;
            const el = barRef.current;
            const io = new IntersectionObserver({
                "CategoryTabs.useEffect": ([entry])=>setStuck(!entry.isIntersecting)
            }["CategoryTabs.useEffect"], {
                rootMargin: '-1px 0px 0px 0px',
                threshold: [
                    1
                ]
            });
            const sentinel = document.createElement('div');
            sentinel.style.position = 'absolute';
            sentinel.style.top = '-1px';
            sentinel.style.height = '1px';
            sentinel.style.width = '1px';
            el.prepend(sentinel);
            io.observe(sentinel);
            return ({
                "CategoryTabs.useEffect": ()=>{
                    io.disconnect();
                    sentinel.remove();
                }
            })["CategoryTabs.useEffect"];
        }
    }["CategoryTabs.useEffect"], []);
    const handleClick = (name)=>{
        setActive(name);
        onChange?.(name);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: barRef,
        className: [
            'sticky top-0 z-40',
            'bg-white supports-[backdrop-filter]:bg-white/80 backdrop-blur',
            stuck ? 'border-b border-gray-200 shadow-sm' : '',
            'px-3'
        ].join(' '),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-x-auto -mx-3 px-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-5 py-3",
                children: categories.map((category)=>{
                    const isActive = active === category.name;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleClick(category.name),
                        className: [
                            'flex flex-col items-center transition-all duration-200',
                            isActive ? 'border-b-4 border-pink-500 rounded-md bg-pink-50 pb-1' : 'pb-1'
                        ].join(' '),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: category.image,
                                alt: category.name,
                                width: 55,
                                height: 55,
                                className: "rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CategoryTabs.js",
                                lineNumber: 73,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs mt-1 ${isActive ? 'text-pink-600 font-semibold' : 'text-gray-500'}`,
                                children: category.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CategoryTabs.js",
                                lineNumber: 80,
                                columnNumber: 17
                            }, this)
                        ]
                    }, category.name, true, {
                        fileName: "[project]/src/app/components/CategoryTabs.js",
                        lineNumber: 63,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/components/CategoryTabs.js",
                lineNumber: 59,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/CategoryTabs.js",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/CategoryTabs.js",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(CategoryTabs, "KrTk3dtQq719nA5fd2R1BfyuT28=");
_c = CategoryTabs;
var _c;
__turbopack_context__.k.register(_c, "CategoryTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/lib/mockData.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, k: __turbopack_refresh__, m: module, e: exports } = __turbopack_context__;
{
// // lib/mockData.js
// export const mockData = {
//   'Vehicle repair': {
//     subCategories: ['Book a Consultant', 'Fixed Service Charge', 'Book by Hour'],
//     professionals: {
//       'Book a Consultant': [
//         { id: 1, name: 'Ravi Auto Garage', imageUrl: '/mock/vehicle1.jpg' },
//         { id: 2, name: 'QuickFix Motors', imageUrl: '/mock/vehicle2.jpg' },
//       ],
//       'Car Service': [
//         { id: 3, name: 'GoMechanic Experts', imageUrl: '/mock/vehicle3.jpg' },
//       ],
//       'Book by Hour': [
//         { id: 4, name: 'Speed Tyres & Repair', imageUrl: '/mock/vehicle4.jpg' },
//       ],
//     },
//   },
//   Healthcare: {
//     subCategories: ['Book a Consultant', 'Fixed Service Charge', 'Book by Hour'],
//     professionals: {
//       'Book a Consultant': [
//         { id: 5, name: 'Dr. Mehta Clinic', imageUrl: '/mock/health1.jpg' },
//       ],
//       'Fixed Service Charge': [
//         { id: 6, name: 'Care at Home Services', imageUrl: '/mock/health2.jpg' },
//       ],
//       'Book by Hour': [
//         { id: 7, name: 'Motion Therapy Hub', imageUrl: '/mock/health3.jpg' },
//       ],
//     },
//   },
//   Carpenter: {
//     subCategories: ['Book a Consultant', 'Fixed Service Charge', 'Book by Hour'],
//     professionals: {
//       'Book a Consultant': [
//         { id: 8, name: 'WoodCraft Repair', imageUrl: '/mock/carpenter1.jpg' },
//       ],
//       'Fixed Service Charge': [
//         { id: 9, name: 'Smart Door Service', imageUrl: '/mock/carpenter2.jpg' },
//       ],
//       'Book by Hour': [
//         { id: 10, name: 'Crafted by Manoj', imageUrl: '/mock/carpenter3.jpg' },
//       ],
//     },
//   },
//   Electrician: {
//     subCategories: ['Book a Consultant', 'Fixed Service Charge', 'Book by Hour'],
//     professionals: {
//       'Book a Consultant': [
//         { id: 11, name: 'Ramesh Electric Works', imageUrl: '/mock/electric1.jpg' },
//         { id: 12, name: 'Vivek Power Point', imageUrl: '/mock/electric2.jpg' },
//       ],
//       'Fixed Service Charge': [
//         { id: 13, name: 'Anand Fan Services', imageUrl: '/mock/electric3.jpg' },
//       ],
//       'Book by Hour': [
//         { id: 14, name: 'Sharma Electricals', imageUrl: '/mock/electric4.jpg' },
//       ],
//     },
//   },
//   'Appliance repair': {
//     subCategories: ['Book a Consultant', 'Fixed Service Charge', 'Book by Hour'],
//     professionals: {
//       'Book a Consultant': [
//         { id: 15, name: 'CoolCare AC Services', imageUrl: '/mock/appliance1.jpg' },
//       ],
//       'Fixed Service Charge': [
//         { id: 16, name: 'FrostFix Technicians', imageUrl: '/mock/appliance2.jpg' },
//       ],
//       'Book by Hour': [
//         { id: 17, name: 'SpinRight Repairs', imageUrl: '/mock/appliance3.jpg' },
//       ],
//     },
//   },
//   'Home Cleaning': {
//     subCategories: ['Book a Consultant', 'Fixed Service Charge', 'Book by Hour'],
//     professionals: {
//       'Book a Consultant': [
//         { id: 18, name: 'SparkClean Team', imageUrl: '/mock/clean1.jpg' },
//       ],
//       'Fixed Service Charge': [
//         { id: 19, name: 'GreaseAway Cleaning', imageUrl: '/mock/clean2.jpg' },
//       ],
//       'Book by Hour': [
//         { id: 20, name: 'ShinePro Services', imageUrl: '/mock/clean3.jpg' },
//       ],
//     },
//   },
// }
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/SubCategoryTabs.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SubCategoryTabs)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$mockData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/mockData.js [app-client] (ecmascript)");
'use client';
;
;
function SubCategoryTabs({ value, onChange, category }) {
    if (!category) return null;
    const subCategories = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$mockData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockData"][category]?.subCategories || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-4 mt-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex overflow-x-auto gap-3",
            children: subCategories.map((sub)=>{
                const isActive = value === sub;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onChange(sub),
                    className: `flex-1 text-sm py-2 rounded-xl border transition-all duration-200
                ${isActive ? 'bg-pink-100 border-pink-500 text-pink-600 font-semibold shadow-sm' : 'bg-white border-gray-300 text-gray-600 hover:border-pink-400'}`,
                    children: sub
                }, sub, false, {
                    fileName: "[project]/src/app/components/SubCategoryTabs.js",
                    lineNumber: 15,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/src/app/components/SubCategoryTabs.js",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/SubCategoryTabs.js",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = SubCategoryTabs;
var _c;
__turbopack_context__.k.register(_c, "SubCategoryTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/RestaurantCard.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>RestaurantCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
'use client';
;
;
;
;
function RestaurantCard({ image = "/Appliances repair professional shop.png", name }) {
    // Slugify name for dynamic path
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/restaurant/${slug}`,
        className: "block",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-xl shadow-sm overflow-hidden mb-4 mx-4 cursor-pointer hover:shadow-md transition-shadow",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex justify-center items-center bg-gray-50 py-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: image,
                        alt: name,
                        width: 200,
                        height: 150,
                        className: "object-cover rounded-lg"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/RestaurantCard.js",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/components/RestaurantCard.js",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 text-xs text-gray-500 mb-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/RestaurantCard.js",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "15–25 mins"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/RestaurantCard.js",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "• 1.2 km"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/RestaurantCard.js",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "• Free"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/RestaurantCard.js",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/RestaurantCard.js",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-medium text-base text-gray-800",
                            children: name
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/RestaurantCard.js",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/RestaurantCard.js",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/RestaurantCard.js",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/RestaurantCard.js",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = RestaurantCard;
var _c;
__turbopack_context__.k.register(_c, "RestaurantCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/lib/getProfessionals.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// // lib/getProfessionals.js
// import { mockData } from './mockData'
// export async function getProfessionals({ category, subCategory }) {
//   // simulate small network delay
//   await new Promise((r) => setTimeout(r, 300))
//   const catData = mockData[category]
//   if (!catData) throw new Error('Category not found')
//   const items = catData.professionals[subCategory] || []
//   return { items }
// }
// lib/getProfessionals.js
__turbopack_context__.s({
    "getProfessionals": (()=>getProfessionals)
});
async function getProfessionals({ category, subCategory }) {
    // Simulate a small loading delay (optional)
    await new Promise((r)=>setTimeout(r, 300));
    // No backend or mock data — return empty array safely
    return {
        items: []
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$CategoryTabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/CategoryTabs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SubCategoryTabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/SubCategoryTabs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$RestaurantCard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/RestaurantCard.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$getProfessionals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/getProfessionals.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function HomePage() {
    _s();
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [subCategory, setSubCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            if (!category || !subCategory) return;
            const run = {
                "HomePage.useEffect.run": async ()=>{
                    setLoading(true);
                    setError('');
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$getProfessionals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProfessionals"])({
                            category,
                            subCategory
                        });
                        setItems(data.items || []);
                    } catch (e) {
                        setError(e.message || 'Failed to load');
                        setItems([]);
                    } finally{
                        setLoading(false);
                    }
                }
            }["HomePage.useEffect.run"];
            run();
        }
    }["HomePage.useEffect"], [
        category,
        subCategory
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-white pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$CategoryTabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                value: category,
                onChange: (val)=>{
                    setCategory(val);
                    setSubCategory('');
                }
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SubCategoryTabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                value: subCategory,
                onChange: setSubCategory,
                category: category
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 41,
                columnNumber: 9
            }, this),
            subCategory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-4 mt-4 text-[11px] font-medium text-gray-400 tracking-wide uppercase",
                        children: loading ? 'Loading…' : `${items.length} Professionals Available`
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-4 mt-2 text-sm text-red-600",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 53,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: items.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$RestaurantCard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                image: p.imageUrl || '/placeholder.png',
                                name: p.name
                            }, p.id, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.js",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(HomePage, "VUqxgcHOg5nfc3/hVbr8ebYJovs=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_c0396472._.js.map
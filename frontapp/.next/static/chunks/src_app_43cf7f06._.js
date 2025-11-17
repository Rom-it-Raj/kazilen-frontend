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
                                lineNumber: 75,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs mt-1 ${isActive ? 'text-pink-600 font-semibold' : 'text-gray-500'}`,
                                children: category.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/CategoryTabs.js",
                                lineNumber: 82,
                                columnNumber: 17
                            }, this)
                        ]
                    }, category.name, true, {
                        fileName: "[project]/src/app/components/CategoryTabs.js",
                        lineNumber: 65,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/components/CategoryTabs.js",
                lineNumber: 61,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/CategoryTabs.js",
            lineNumber: 60,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/CategoryTabs.js",
        lineNumber: 51,
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
"[project]/src/app/components/SubCategoryTabs.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SubCategoryTabs)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const subCategories = [
    'Book a Consultant',
    'Fixed Service Charge',
    'Book by Hour'
];
function SubCategoryTabs({ value, onChange }) {
    _s();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    const handleClick = (sub)=>{
        setActive(sub);
        onChange?.(sub);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-4 mt-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex overflow-x-auto gap-3",
            children: subCategories.map((sub)=>{
                const isActive = active === sub;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>handleClick(sub),
                    className: `flex-1 text-sm py-2 rounded-xl border transition-all duration-200
                ${isActive ? 'bg-pink-100 border-pink-500 text-pink-600 font-semibold shadow-sm' : 'bg-white border-gray-300 text-gray-600 hover:border-pink-400'}`,
                    children: sub
                }, sub, false, {
                    fileName: "[project]/src/app/components/SubCategoryTabs.js",
                    lineNumber: 24,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/src/app/components/SubCategoryTabs.js",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/SubCategoryTabs.js",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(SubCategoryTabs, "Zb5W4q/xzoP+pzI8f4nqd/awUfU=");
_c = SubCategoryTabs;
var _c;
__turbopack_context__.k.register(_c, "SubCategoryTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/lib/getProfessionals.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getProfessionals": (()=>getProfessionals)
});
async function getProfessionals({ category }) {
    const professionals = [
        {
            name: 'AC Technician',
            image: '/workers/ac.png',
            category: 'Appliances',
            subCategory: 'Fixed Service Charge'
        },
        {
            name: 'Electrician',
            image: '/workers/electrician.png',
            category: 'Electrical',
            subCategory: 'Book a Consultant'
        },
        {
            name: 'Plumber',
            image: '/workers/plumber.png',
            category: 'Plumbing',
            subCategory: 'Book by Hour'
        }
    ];
    // Simple filter by category only
    const items = professionals.filter((pro)=>pro.category.toLowerCase() === category.toLowerCase());
    return {
        items
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$getProfessionals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/getProfessionals.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
            if (!category) return; // don’t fetch until category is selected
            const run = {
                "HomePage.useEffect.run": async ()=>{
                    setLoading(true);
                    setError('');
                    try {
                        // ✅ If subCategory is empty, fetch all professionals under that category
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$getProfessionals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProfessionals"])({
                            category,
                            subCategory: subCategory || 'All'
                        });
                        console.log('Fetched data:', data) // helpful for debugging
                        ;
                        setItems(data?.items || []);
                    } catch (e) {
                        setError(e.message || 'Failed to load data');
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
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$CategoryTabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            value: category,
            onChange: (val)=>{
                setCategory(val);
                setSubCategory('') // reset subcategory when category changes
                ;
            }
        }, void 0, false, {
            fileName: "[project]/src/app/page.js",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.js",
        lineNumber: 43,
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

//# sourceMappingURL=src_app_43cf7f06._.js.map
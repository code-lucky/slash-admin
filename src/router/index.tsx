import { lazy } from 'react';
import { Navigate, RouteObject, RouterProvider, createHashRouter } from 'react-router-dom';

import DashboardLayout from '@/layouts/dashboard';
import AuthGuard from '@/router/components/auth-guard';
import { usePermissionRoutes } from '@/router/hooks';
import { ErrorRoutes } from '@/router/routes/error-routes';
import { DEFAULT_USER } from '@/_mock/assets';

import { AppRouteObject } from '#/router';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
const LoginRoute: AppRouteObject = {
  path: '/login',
  Component: lazy(() => import('@/pages/sys/login/Login')),
};
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
};

export default function Router() {
  const permissionRoutes = usePermissionRoutes();

  const permission = [
    {
        "id": "9100714781927703",
        "parentId": "",
        "label": "sys.menu.dashboard",
        "name": "Dashboard",
        "icon": "ic-analysis",
        "type": 0,
        "path": "dashboard",
        "order": 1,
        "children": [
            {
                "id": "8426999229400979",
                "parentId": "9100714781927703",
                "label": "sys.menu.workbench",
                "name": "Workbench",
                "type": 1,
                "path": "workbench",
                "component": "/dashboard/workbench/index.tsx"
            },
            {
                "id": "9710971640510357",
                "parentId": "9100714781927703",
                "label": "sys.menu.analysis",
                "name": "Analysis",
                "type": 1,
                "path": "analysis",
                "component": "/dashboard/analysis/index.tsx"
            }
        ]
    },
    {
        "id": "0901673425580518",
        "parentId": "",
        "label": "sys.menu.management",
        "name": "Management",
        "icon": "ic-management",
        "type": 0,
        "path": "management",
        "order": 2,
        "children": [
            {
                "id": "2781684678535711",
                "parentId": "0901673425580518",
                "label": "sys.menu.user.index",
                "name": "User",
                "type": 0,
                "path": "user",
                "children": [
                    {
                        "id": "4754063958766648",
                        "parentId": "2781684678535711",
                        "label": "sys.menu.user.profile",
                        "name": "Profile",
                        "type": 1,
                        "path": "profile",
                        "component": "/management/user/profile/index.tsx"
                    },
                    {
                        "id": "2516598794787938",
                        "parentId": "2781684678535711",
                        "label": "sys.menu.user.account",
                        "name": "Account",
                        "type": 1,
                        "path": "account",
                        "component": "/management/user/account/index.tsx"
                    }
                ]
            },
            {
                "id": "0249937641030250",
                "parentId": "0901673425580518",
                "label": "sys.menu.system.index",
                "name": "System",
                "type": 0,
                "path": "system",
                "children": [
                    {
                        "id": "1985890042972842",
                        "parentId": "0249937641030250",
                        "label": "sys.menu.system.organization",
                        "name": "Organization",
                        "type": 1,
                        "path": "organization",
                        "component": "/management/system/organization/index.tsx"
                    },
                    {
                        "id": "4359580910369984",
                        "parentId": "0249937641030250",
                        "label": "sys.menu.system.permission",
                        "name": "Permission",
                        "type": 1,
                        "path": "permission",
                        "component": "/management/system/permission/index.tsx"
                    },
                    {
                        "id": "1689241785490759",
                        "parentId": "0249937641030250",
                        "label": "sys.menu.system.role",
                        "name": "Role",
                        "type": 1,
                        "path": "role",
                        "component": "/management/system/role/index.tsx"
                    },
                    {
                        "id": "0157880245365433",
                        "parentId": "0249937641030250",
                        "label": "sys.menu.system.user",
                        "name": "User",
                        "type": 1,
                        "path": "user",
                        "component": "/management/system/user/index.tsx"
                    },
                    {
                        "id": "0157880245365434",
                        "parentId": "0249937641030250",
                        "label": "sys.menu.system.user_detail",
                        "name": "User Detail",
                        "type": 1,
                        "path": "user/:id",
                        "component": "/management/system/user/detail.tsx",
                        "hide": true
                    }
                ]
            }
        ]
    },
    {
        "id": "2271615060673773",
        "parentId": "",
        "label": "sys.menu.components",
        "name": "Components",
        "icon": "solar:widget-5-bold-duotone",
        "type": 0,
        "path": "components",
        "order": 3,
        "children": [
            {
                "id": "2478488238255411",
                "parentId": "2271615060673773",
                "label": "sys.menu.icon",
                "name": "Icon",
                "type": 1,
                "path": "icon",
                "component": "/components/icon/index.tsx"
            },
            {
                "id": "6755238352318767",
                "parentId": "2271615060673773",
                "label": "sys.menu.animate",
                "name": "Animate",
                "type": 1,
                "path": "animate",
                "component": "/components/animate/index.tsx"
            },
            {
                "id": "9992476513546805",
                "parentId": "2271615060673773",
                "label": "sys.menu.scroll",
                "name": "Scroll",
                "type": 1,
                "path": "scroll",
                "component": "/components/scroll/index.tsx"
            },
            {
                "id": "1755562695856395",
                "parentId": "2271615060673773",
                "label": "sys.menu.markdown",
                "name": "Markdown",
                "type": 1,
                "path": "markdown",
                "component": "/components/markdown/index.tsx"
            },
            {
                "id": "2122547769468069",
                "parentId": "2271615060673773",
                "label": "sys.menu.editor",
                "name": "Editor",
                "type": 1,
                "path": "editor",
                "component": "/components/editor/index.tsx"
            },
            {
                "id": "2501920741714350",
                "parentId": "2271615060673773",
                "label": "sys.menu.i18n",
                "name": "Multi Language",
                "type": 1,
                "path": "i18n",
                "component": "/components/multi-language/index.tsx"
            },
            {
                "id": "2013577074467956",
                "parentId": "2271615060673773",
                "label": "sys.menu.upload",
                "name": "upload",
                "type": 1,
                "path": "Upload",
                "component": "/components/upload/index.tsx"
            },
            {
                "id": "7749726274771764",
                "parentId": "2271615060673773",
                "label": "sys.menu.chart",
                "name": "Chart",
                "type": 1,
                "path": "chart",
                "component": "/components/chart/index.tsx"
            }
        ]
    },
    {
        "id": "8132044808088488",
        "parentId": "",
        "label": "sys.menu.functions",
        "name": "functions",
        "icon": "solar:plain-2-bold-duotone",
        "type": 0,
        "path": "functions",
        "order": 4,
        "children": [
            {
                "id": "3667930780705750",
                "parentId": "8132044808088488",
                "label": "sys.menu.clipboard",
                "name": "Clipboard",
                "type": 1,
                "path": "clipboard",
                "component": "/functions/clipboard/index.tsx"
            },
            {
                "id": "3667930780705751",
                "parentId": "8132044808088488",
                "label": "sys.menu.token_expired",
                "name": "Token Expired",
                "type": 1,
                "path": "token-expired",
                "component": "/functions/token-expired/index.tsx"
            }
        ]
    },
    {
        "id": "0194818428516575",
        "parentId": "",
        "label": "sys.menu.menulevel.index",
        "name": "Menu Level",
        "icon": "ic-menulevel",
        "type": 0,
        "path": "menu-level",
        "order": 5,
        "children": [
            {
                "id": "0144431332471389",
                "parentId": "0194818428516575",
                "label": "sys.menu.menulevel.1a",
                "name": "Menu Level 1a",
                "type": 1,
                "path": "menu-level-1a",
                "component": "/menu-level/menu-level-1a/index.tsx"
            },
            {
                "id": "7572529636800586",
                "parentId": "0194818428516575",
                "label": "sys.menu.menulevel.1b.index",
                "name": "Menu Level 1b",
                "type": 0,
                "path": "menu-level-1b",
                "children": [
                    {
                        "id": "3653745576583237",
                        "parentId": "7572529636800586",
                        "label": "sys.menu.menulevel.1b.2a",
                        "name": "Menu Level 2a",
                        "type": 1,
                        "path": "menu-level-2a",
                        "component": "/menu-level/menu-level-1b/menu-level-2a/index.tsx"
                    },
                    {
                        "id": "4873136353891364",
                        "parentId": "7572529636800586",
                        "label": "sys.menu.menulevel.1b.2b.index",
                        "name": "Menu Level 2b",
                        "type": 0,
                        "path": "menu-level-2b",
                        "children": [
                            {
                                "id": "4233029726998055",
                                "parentId": "4873136353891364",
                                "label": "sys.menu.menulevel.1b.2b.3a",
                                "name": "Menu Level 3a",
                                "type": 1,
                                "path": "menu-level-3a",
                                "component": "/menu-level/menu-level-1b/menu-level-2b/menu-level-3a/index.tsx"
                            },
                            {
                                "id": "3298034742548454",
                                "parentId": "4873136353891364",
                                "label": "sys.menu.menulevel.1b.2b.3b",
                                "name": "Menu Level 3b",
                                "type": 1,
                                "path": "menu-level-3b",
                                "component": "/menu-level/menu-level-1b/menu-level-2b/menu-level-3b/index.tsx"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "9406067785553476",
        "parentId": "",
        "label": "sys.menu.error.index",
        "name": "Error",
        "icon": "bxs:error-alt",
        "type": 0,
        "path": "error",
        "order": 6,
        "children": [
            {
                "id": "8557056851997154",
                "parentId": "9406067785553476",
                "label": "sys.menu.error.403",
                "name": "403",
                "type": 1,
                "path": "403",
                "component": "/sys/error/Page403.tsx"
            },
            {
                "id": "5095669208159005",
                "parentId": "9406067785553476",
                "label": "sys.menu.error.404",
                "name": "404",
                "type": 1,
                "path": "404",
                "component": "/sys/error/Page404.tsx"
            },
            {
                "id": "0225992135973772",
                "parentId": "9406067785553476",
                "label": "sys.menu.error.500",
                "name": "500",
                "type": 1,
                "path": "500",
                "component": "/sys/error/Page500.tsx"
            }
        ]
    },
    {
        "id": "3981225257359246",
        "parentId": "",
        "label": "sys.menu.calendar",
        "name": "Calendar",
        "icon": "solar:calendar-bold-duotone",
        "type": 1,
        "path": "calendar",
        "component": "/sys/others/calendar/index.tsx"
    },
    {
        "id": "3513985683886393",
        "parentId": "",
        "label": "sys.menu.kanban",
        "name": "kanban",
        "icon": "solar:clipboard-bold-duotone",
        "type": 1,
        "path": "kanban",
        "component": "/sys/others/kanban/index.tsx"
    },
    {
        "id": "5455837930804461",
        "parentId": "",
        "label": "sys.menu.disabled",
        "name": "Disabled",
        "icon": "ic_disabled",
        "type": 1,
        "path": "disabled",
        "status": 0,
        "component": "/sys/others/calendar/index.tsx"
    },
    {
        "id": "7728048658221587",
        "parentId": "",
        "label": "sys.menu.label",
        "name": "Label",
        "icon": "ic_label",
        "type": 1,
        "path": "label",
        "newFeature": true,
        "component": "/sys/others/blank.tsx"
    },
    {
        "id": "5733704222120995",
        "parentId": "",
        "label": "sys.menu.frame",
        "name": "Frame",
        "icon": "ic_external",
        "type": 0,
        "path": "frame",
        "children": [
            {
                "id": "9884486809510480",
                "parentId": "5733704222120995",
                "label": "sys.menu.external_link",
                "name": "External Link",
                "type": 1,
                "path": "external_link",
                "hideTab": true,
                "component": "/sys/others/iframe/external-link.tsx",
                "frameSrc": "https://ant.design/"
            },
            {
                "id": "9299640886731819",
                "parentId": "5733704222120995",
                "label": "sys.menu.iframe",
                "name": "Iframe",
                "type": 1,
                "path": "frame",
                "component": "/sys/others/iframe/index.tsx",
                "frameSrc": "https://ant.design/"
            }
        ]
    },
    {
        "id": "0941594969900756",
        "parentId": "",
        "label": "sys.menu.blank",
        "name": "Disabled",
        "icon": "ic_blank",
        "type": 1,
        "path": "blank",
        "component": "/sys/others/blank.tsx"
    }
]

  const asyncRoutes: AppRouteObject = {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }],
  };
  console.log('asyncRoutes', asyncRoutes);
  const routes = [LoginRoute, asyncRoutes, ErrorRoutes, PAGE_NOT_FOUND_ROUTE];

  const router = createHashRouter(routes as unknown as RouteObject[]);

  return <RouterProvider router={router} />;
}

import { usePathname } from "next/navigation"

type PageItem = {
    title: string;
    path: string;
    access: ('admin' | 'staff' | 'partner')[];
}

const pageList: PageItem[] = [
    {
        title : 'Home',
        path : '/',
        access : ['admin', 'staff', 'partner']
    },
    {
        title : 'Form IDD',
        path : '/form-idd',
        access : ['partner']
    },
    {
        title : 'Penilaian IDD',
        path : '/penilaian-idd',
        access : ['staff']
    },
    {
        title : 'Daftar Pengguna',
        path : '/user-list',
        access : ['admin']
    }
]

const usePage = () => {
    const pathname = usePathname();

    const currentPage = pageList.find(page => page.path === pathname);

    return currentPage;
}

export { usePage, pageList }
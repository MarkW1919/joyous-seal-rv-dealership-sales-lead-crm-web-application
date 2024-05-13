import { cn } from "../lib/utils";

interface PageProps {
  index: number;
  page: {
    name: string;
    path: string;
    components: string[];
  };
}

function Page({ index, page }: PageProps) {
  return (
    <a
      key={page.name}
      href={`${window.location.origin}${page.path}`}
      className={cn(
        "flex space-x-3 items-center border-2 border-white/10 bg-white/10 p-2 rounded-md text-center text-xs cursor-pointer hover:bg-white/20 transition-colors duration-300",
        {
          "bg-white/20 border-white border-2":
            window.location.pathname === page.path,
        }
      )}
    >
      <div className="rounded-full border bg-white/90 text-black h-5 w-5 flex items-center justify-center text-xs">
        {++index}
      </div>
      <span>{page.name}</span>
    </a>
  );
}

export default Page;

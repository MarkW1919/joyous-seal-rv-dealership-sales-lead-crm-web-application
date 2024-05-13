interface ComponentProps {
  component: string;
}

function Component({ component }: ComponentProps) {
  return (
    <div className="bg-white/10 p-2 text-center text-xs overflow-x-auto">
      {component}
    </div>
  );
}

export default Component;

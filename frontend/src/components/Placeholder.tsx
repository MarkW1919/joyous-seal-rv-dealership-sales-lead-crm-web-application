import { Card, CardContent } from "@/components/ui/card";

const Placeholder = () => (
  <div className="flex items-center justify-center mt-40">
    <Card className="max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center p-10 space-y-2">
        <svg xmlSpace="preserve" viewBox="0 0 62.4 59" className="h-16 w-16">
          <path
            fill="#000"
            d="m54.3 30.9-7.7 7.7c-.3.3-.8.5-1.2.5s-.9-.2-1.2-.5l-7.8-7.8H12.2l-4.6 4.6c-.7.7-1.8.7-2.5 0L.6 30.9c-.7-.7-.7-1.8 0-2.5L5 23.8c.7-.7 1.8-.7 2.5 0l4.6 4.6h24.1l7.8-7.8c.3-.3.8-.5 1.2-.5.5 0 .9.2 1.2.5l7.7 7.7c.9.8.9 1.9.2 2.6z"
          />
          <linearGradient
            id="a"
            x1="-1016.342"
            x2="-993.926"
            y1="-1542.96"
            y2="-1565.376"
            gradientTransform="rotate(45.001 -2418.245 509.872)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#3ca3ed" />
            <stop offset="1" stopColor="#3ed070" />
          </linearGradient>
          <path
            fill="url(#a)"
            d="m61.9 50.8-4.5 4.5c-.7.7-1.8.7-2.5 0l-4.6-4.6H37.7l-7.8 7.8c-.3.3-.8.5-1.2.5s-.9-.2-1.2-.5l-7.7-7.7c-.3-.3-.5-.8-.5-1.2s.2-.9.5-1.2l7.7-7.7c.3-.3.8-.5 1.2-.5s.9.2 1.2.5l7.8 7.8h12.5l4.6-4.6c.7-.7 1.8-.7 2.5 0l4.5 4.5c.8.6.8 1.8.1 2.4z"
          />
          <linearGradient
            id="b"
            x1="-1283.298"
            x2="-1260.882"
            y1="-1809.918"
            y2="-1832.333"
            gradientTransform="scale(1 -1) rotate(45 -2802.767 669.113)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#3ca3ed" />
            <stop offset="1" stopColor="#3ed070" />
          </linearGradient>
          <path
            fill="url(#b)"
            d="m61.9 8.2-4.5-4.5c-.7-.7-1.8-.7-2.5 0l-4.6 4.6H37.7L29.9.5c-.3-.3-.8-.5-1.3-.5s-.9.2-1.2.5l-7.7 7.7c-.3.3-.5.8-.5 1.2s.2.9.5 1.2l7.7 7.7c.3.3.8.5 1.2.5s.9-.2 1.2-.5l7.8-7.8h12.5l4.6 4.6c.7.7 1.8.7 2.5 0l4.5-4.5c.9-.6.9-1.7.2-2.4z"
          />
        </svg>
        <p className="text-lg font-semibold text-center">
          Chat to create your frontend
        </p>
      </CardContent>
    </Card>
  </div>
);

export default Placeholder;

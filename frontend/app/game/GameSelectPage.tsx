import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@remix-run/react";

export const GameSelectPage = () => {
    const navigate = useNavigate()
    const list = [
        {
          title: "x01",
          img: "/images/fruit-1.jpeg",
          link: "x01"
        }
      ];

  return (
    <>
      <h1>Select game</h1>
      <div className="grid gap-2 grid-cols-3">
      {list.map((item, index) => (
        <Card key={index} onClick={() => navigate(item.link)}>
          <CardContent className="overflow-visible p-0">
            <img 
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardContent>
        </Card>
        
      ))}
    </div>
    </>
  );
};



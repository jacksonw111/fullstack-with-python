import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Upload = () => {
  return (
    <div>
      <p>需要实现的功能，大文件分片上传。</p>
      <div className="relative overflow-hidden w-64 cursor-pointer">
        <Input
          type="file"
          className="cursor-pointer absolute top-0 left-0 opacity-0 w-full h-full"
        />
        <Button className="cursor-pointer">上传文件</Button>
      </div>
    </div>
  );
};

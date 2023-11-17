import { Input } from "@/components/ui/input"

export const Upload = () => {
  return (
    <div>
      <p>
        需要实现的功能，大文件分片上传。
      </p>
      <div>
        <Input type="file" className="cursor-pointer"/>
      </div>
    </div>
  )
}
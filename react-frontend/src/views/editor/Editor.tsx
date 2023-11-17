import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Editor = () => {
  const [markdown, setMarkdown] = useState<string>();

  return (
    <div className="w-full h-full flex gap-3 ">
      <div className="w-1/2">
        <Textarea
          className="h-full"
          placeholder="Type your message here."
          onChange={(e) => setMarkdown(e.currentTarget.value)}
        />
      </div>
      <div className="w-1/2 shadow-lg">
        <Markdown
          className="p-3"
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        >
          {markdown}
        </Markdown>
      </div>
    </div>
  );
};

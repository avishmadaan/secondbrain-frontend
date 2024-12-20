import {
  Delete,
  DockIcon,
  Link2,
  LinkIcon,
  Trash2,
  Twitter,
  VideoIcon,
} from "lucide-react";
import { useCallback, useContext, useState } from "react";
import { Button } from "../ui/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { AlertContext } from "../ui/Alert";
import { useContent } from "./useContent";

export function ContentBox(props: {
  link: string;
  type: string;
  title: string;
  description: string;
  tags: [{ title: string }];
  id: string;
}) {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useContext(AlertContext);

  const {fetchAllContents} = useContent();

  function onClick() {
    window.open(props.link, "_blank");
  }

  async function deleteContent() {
    console.log(props.id);
    const token = Cookies.get("token");

    try {
      const response = await axios.delete(
        "http://localhost:3000/api/v1/content/delete/" + props.id,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response.data);
      showAlert("Content deleted Successfully", "positive");
      fetchAllContents();
    } catch (e) {
      console.log(e.response);
      showAlert("Some Error Occured, Try Again", "negetive");
    } finally {
    }
  }

  return (
    <div className="bg-white border border-gray-200 p-3 rounded-md min-h-[200px] relative pb-16">
      <div className="flex justify-between text-sm text-gray-400 items-center">
        <div className="type flex gap-2 items-center bg-softGray p-1 rounded-md">
          {props.type == "tweet" && <Twitter size={16} />}
          {props.type == "video" && <VideoIcon size={16} />}
          {props.type == "document" && <DockIcon size={16} />}
          {props.type == "link" && <LinkIcon size={16} />}
          <span className="">{props.type}</span>
        </div>

        <div className="flex gap-2" id="icons">
          <Trash2
            onClick={deleteContent}
            className="cursor-pointer"
            size={16}
          />
        </div>
      </div>

      <div className="my-3">
        <h1 className="text-xl font-semibold">{props.title}</h1>
        {props.type == "video" && (
          // https://www.youtube.com/embed/f82RH6mBquc
          
          <iframe
            className="w-full mt-3"
            src={props.link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        )}

        {props.type == "tweet" && (
          <>
            <blockquote className="twitter-tweet">
              <a href={props.link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </>
        )}

        <p className="">{props.description}</p>

        <div className="my-3 flex flex-wrap">
          {props.tags && props.tags.length>1 && (
            <>
              {props.tags.map((tag, index) => {
                return (
                  <span key={index} className="bg-gray-100 rounded-md mx-1 px-2 py-1 text-sm m-2">
                    #{tag.title}
                  </span>
                );
              })}
            </>
          )}
        </div>

        {props.link && (props.type === "document" || props.type === "link") && (
          <Button
            variant={"secondary"}
            onClick={onClick}
            className="p-1 py-1 absolute bottom-5 "
          >
            Visit Link
          </Button>
        )}
      </div>
    </div>
  );
}

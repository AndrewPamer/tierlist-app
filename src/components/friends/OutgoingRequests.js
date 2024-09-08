import { createClient } from "@/utils/supabase/server";
import FriendCard from "./FriendCard";

async function cancelRequest(request_id) {
  const supabase = createClient();
  try {
    const { error } = await supabase.rpc("cancel_outgoing_friend_request", {
      request_id,
    });

    if (error) {
      throw error;
    }
  } catch (e) {
    console.error(e);
  }
}

async function getOutgoingRequests() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_outgoing_friend_requests");
  return data;
}

export default async function OutgoingRequests() {
  const data = await getOutgoingRequests();
  if (data.length == 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold self-center">Outgoing Friend Requests</h2>
      {data.map((outgoingReq) => {
        return (
          <FriendCard
            key={outgoingReq.request_id}
            name={outgoingReq.recipient_username}
            color={outgoingReq.color}
            buttons={[
              {
                buttonTitle: "Cancel Request",
                popupTitle: `Cancel friend request to ${outgoingReq.recipient_username}`,
                popupHeader: `Are you sure you want to cancel the friend request to ${outgoingReq.recipient_username}?`,
                popupAction: async () => {
                  "use server";
                  cancelRequest(outgoingReq.request_id);
                },
              },
            ]}
          />
        );
      })}
      <hr className="my-5" />
    </div>
  );
}

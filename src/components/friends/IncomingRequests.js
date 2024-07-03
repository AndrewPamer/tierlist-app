"use client";
import {
  useSubscription,
  useQuery,
} from "@supabase-cache-helpers/postgrest-swr";
import FriendCard from "./FriendCard";
export default function IncomingRequests({ supabase, user }) {
  // const [incoming, setIncoming] = useState([]);

  const { data, isLoading, error, mutate } = useQuery(
    supabase.rpc("get_incoming_friend_requests"),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { status } = useSubscription(
    supabase,
    "incoming_db_changes",
    {
      event: "*",
      schema: "public",
      table: "friendrequests",
      filter: `recipient_id=eq.${user.id}`,
    },
    ["id"],
    {
      callback: (payload) => {
        // console.log(payload);
        mutate();
      },
    }
  );

  // useEffect(() => {
  //   async function getIncoming() {
  //     try {
  //       const { data, error } = await supabase.rpc(
  //         "get_incoming_friend_requests"
  //       );
  //       if (error) {
  //         throw error;
  //       }
  //       setIncoming(data);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }

  //   const subscription = supabase
  //     .channel("incoming_db_changes")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "*",
  //         schema: "public",
  //         table: "friendrequests",
  //         filter: `recipient_id=eq.${user.id}`,
  //       },
  //       (payload) => {
  //         console.log("in");
  //         getIncoming();
  //       }
  //     )
  //     .subscribe();

  //   getIncoming();
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, []);

  async function acceptRequest(requestid) {
    try {
      const { error } = await supabase.rpc("accept_friend_request", {
        requestid,
      });
      if (error) {
        throw error;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function denyRequest(requestid) {
    try {
      const { error } = await supabase.rpc("deny_friend_request", {
        requestid,
      });
      if (error) {
        throw error;
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (isLoading) {
    return "Loading...";
  }

  if (data.length == 0) {
    return null;
  }

  return (
    <div className="flex flex-col ">
      <h2 className="font-bold self-center">Incoming Friend Requests</h2>
      {data.map((incomingReq) => {
        return (
          <FriendCard
            key={incomingReq.request_id}
            name={incomingReq.sender_username}
            color={incomingReq.color}
            buttons={[
              {
                buttonTitle: "Accept Request",
                popupTitle: `Accept friend request from ${incomingReq.sender_username}`,
                popupHeader: `Are you sure you want to accept the friend request from ${incomingReq.sender_username}?`,
                popupAction: () => acceptRequest(incomingReq.request_id),
              },
              {
                buttonTitle: "Deny Request",
                popupTitle: `Deny friend request from ${incomingReq.sender_username}`,
                popupHeader: `Are you sure you want to deny the friend request from ${incomingReq.sender_username}?`,
                popupAction: () => denyRequest(incomingReq.request_id),
              },
            ]}
          />
        );
      })}
      <hr className="my-5" />
    </div>
  );
}

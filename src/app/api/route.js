import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const requests = [];

  for (let index = 1; index <= 11; index++) {
    const url = `https://pixels-server.pixels.xyz/game/findroom/guildCropWarsA${index}/1?v=1722615931733`;
    requests.push(
      fetch(url, {
        method: "GET",
        cache: "no-store",
        next: { revalidate: 10 },
      })
        .then((response) => response.json())
        .then((data) => data)
    );
  }

  try {
    const roomsIds = await Promise.all(requests);

    const body = {
      mapId: "",
      token: "rvikguSWUHt3vkMzvOP3b86-Kgl8sQR4HKjTUjmhfrg4",
      isGuest: false,
      cryptoWallet: {},
      username: "Panadero Triste",
      playerId: "65a9d74c3a2ecbd47f6ce9fb",
      world: 1,
      ver: 8.25,
      avatar: "",
      domtitle: "Pixels: An Infinite World of Endless Adventure",
      haveHandshake: false,
    };

    const dataRoomsIdsRequests = roomsIds.map(async ({ roomId, server }) => {
      const url = `https://pixels-server.pixels.xyz/matchmake/joinById/${roomId}/${server}`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        cache: "no-store",
        next: { revalidate: 10 },
      });
      return await response.json();
    });

    const dataRoomsIds = await Promise.all(dataRoomsIdsRequests);

    return NextResponse.json(dataRoomsIds);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

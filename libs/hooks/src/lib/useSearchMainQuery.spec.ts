import { Enum_Manufacturer_Color, FindManufacturerCardQuery, SearchHit } from "@facture/types";
import { renderHook, act } from "@testing-library/react-hooks";
import { useSearchMainQuery } from "./useSearchMainQuery";

jest.mock("@apollo/client", () => {
    const originalModule = jest.requireActual("@apollo/client");

    const data1: FindManufacturerCardQuery = {
        manufacturers: {
            data: [
                {
                    attributes: {
                        descriptionShort: "d1",
                        logo: { data: { attributes: { url: "url1" } } },
                        manufacturer: "m1",
                        name: "n1",
                        type: [{ type: "t1" }],
                        thumbnail: { data: { attributes: { url: "url1" } } },
                        color: Enum_Manufacturer_Color["Amber"],
                    },
                },
            ],
            meta: { pagination: { pageCount: 2 } },
        },
    };
    const data2: FindManufacturerCardQuery = {
        manufacturers: {
            data: [
                {
                    attributes: {
                        descriptionShort: "d2",
                        logo: { data: { attributes: { url: "url2" } } },
                        manufacturer: "m2",
                        name: "n2",
                        type: [{ type: "t2" }],
                        thumbnail: { data: { attributes: { url: "url2" } } },
                        color: Enum_Manufacturer_Color["Blue"],
                    },
                },
            ],
            meta: { pagination: { pageCount: 2 } },
        },
    };

    const fetchMore = (options: { variables: { pageSize: number; page: number } }) =>
        new Promise<{ data: FindManufacturerCardQuery }>((resolve) => resolve({ data: data2 }));

    return { __esModule: true, ...originalModule, useQuery: (query: any, options: any) => ({ data: data1, fetchMore }) };
});

describe("use search main query", () => {
    it("should return hits from the api", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useSearchMainQuery(1));

        expect(result.current.data).toEqual([
            {
                descriptionShort: "d1",
                logo: { url: "url1" },
                manufacturer: "m1",
                name: "n1",
                slogan: undefined,
                type: ["t1"],
                color: "amber",
                thumbnail: { url: "url1" },
            },
        ]);

        act(() => {
            if (result.current.loadMore) result.current.loadMore();
        });
        await waitForNextUpdate();
        expect(result.current.data).toEqual([
            {
                descriptionShort: "d1",
                logo: { url: "url1" },
                manufacturer: "m1",
                name: "n1",
                slogan: undefined,
                type: ["t1"],
                color: "amber",
                thumbnail: { url: "url1" },
            },
            {
                descriptionShort: "d2",
                logo: { url: "url2" },
                manufacturer: "m2",
                name: "n2",
                slogan: undefined,
                type: ["t2"],
                color: "blue",
                thumbnail: { url: "url2" },
            },
        ]);

        expect(result.current.loadMore).not.toBeTruthy();
    });
});

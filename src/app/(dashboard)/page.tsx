import { DialogMediaModal } from "./_components/dialog-media-modal";
import {
    WrapperMediaTable,
    WrapperMediaTableSkeleton,
} from "./_components/wrapper-media-table";
import { Suspense } from "react";

export default function Page() {
    return (
        <>
            <div className="flex items-center">
                <DialogMediaModal />
            </div>
            <Suspense fallback={<WrapperMediaTableSkeleton />}>
                <WrapperMediaTable />
            </Suspense>
        </>
    );
}

export default function Spinner() {

    return (
        <>
            <div className="h-screen items-center flex flex-col-reverse space-y-2 justify-center">
                <div className="text-xl text-slate-100 text-center my-5">Please wait while we proceed your transaction . . .</div>
                <div class='flex space-x-2 justify-center items-center bg-slate-900'>
                    <span class='sr-only'>Loading...</span>
                    <div class='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div class='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div class='h-8 w-8 bg-white rounded-full animate-bounce'></div>
                </div></div>
        </>
    )
}
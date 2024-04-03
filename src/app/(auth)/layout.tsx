export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full grid place-items-center">{children}</div>
    );
}

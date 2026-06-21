import { useMemo, useState, type FormEvent, type ReactElement, type ReactNode } from "react";
import {
    FaBell,
    FaBookmark,
    FaCalendarAlt,
    FaCamera,
    FaCheck,
    FaFacebookF,
    FaFacebookMessenger,
    FaGamepad,
    FaGlobeAmericas,
    FaHeart,
    FaHome,
    FaImage,
    FaLaughSquint,
    FaLock,
    FaMapMarkerAlt,
    FaMoon,
    FaPaperPlane,
    FaPlusCircle,
    FaSadTear,
    FaSearch,
    FaShare,
    FaStore,
    FaSun,
    FaThumbsUp,
    FaTimes,
    FaTv,
    FaUserFriends,
    FaUserPlus,
    FaUsers,
    FaVideo,
} from "react-icons/fa";

type ViewKey = "home" | "friends" | "watch" | "marketplace" | "groups" | "events" | "gaming" | "saved" | "profile";
type Privacy = "Public" | "Friends" | "Only me";
type Reaction = "like" | "love" | "haha" | "sad";

type Person = {
    id: number;
    name: string;
    role: string;
    avatar: string;
    cover: string;
    online?: boolean;
    mutual?: number;
};

type Post = {
    id: number;
    author: Person;
    time: string;
    privacy: Privacy;
    text: string;
    image?: string;
    location?: string;
    liked: boolean;
    saved: boolean;
    reaction?: Reaction;
    reactions: Record<Reaction, number>;
    comments: string[];
    shares: number;
};

type Message = {
    id: number;
    from: "me" | "them";
    text: string;
};

const me: Person = {
    id: 1,
    name: "Chiranjibi Debkota",
    role: "React Developer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    cover: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    online: true,
};

const people: Person[] = [
    {
        id: 2,
        name: "Aarav Sharma",
        role: "Product Designer",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
        cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        online: true,
        mutual: 18,
    },
    {
        id: 3,
        name: "Maya Thapa",
        role: "Community Lead",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
        cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        online: true,
        mutual: 42,
    },
    {
        id: 4,
        name: "Nisha Gurung",
        role: "Photographer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
        cover: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
        mutual: 12,
    },
    {
        id: 5,
        name: "Samir Rai",
        role: "Startup Founder",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
        cover: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80",
        online: true,
        mutual: 27,
    },
    {
        id: 6,
        name: "Elina Karki",
        role: "Travel Creator",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
        cover: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
        mutual: 31,
    },
];

const initialPosts: Post[] = [
    {
        id: 101,
        author: people[1],
        time: "8 min",
        privacy: "Public",
        text: "Finished planning the Kathmandu community meetup. React talks, design critique, and plenty of coffee are officially on the board.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        location: "Kathmandu, Nepal",
        liked: false,
        saved: false,
        reactions: { like: 126, love: 34, haha: 8, sad: 0 },
        comments: ["Count me in!", "Please save one seat for me."],
        shares: 14,
    },
    {
        id: 102,
        author: people[2],
        time: "34 min",
        privacy: "Friends",
        text: "A quiet morning shoot turned into my favorite set of the month. The city looks different when everyone else is still waking up.",
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
        location: "Nagarkot",
        liked: true,
        saved: true,
        reaction: "love",
        reactions: { like: 91, love: 58, haha: 2, sad: 0 },
        comments: ["This frame is beautiful.", "Your color grading is getting so good."],
        shares: 9,
    },
    {
        id: 103,
        author: people[3],
        time: "1 hr",
        privacy: "Public",
        text: "Shipping a new landing page today. The best product work still feels like listening carefully, then removing everything that does not help.",
        liked: false,
        saved: false,
        reactions: { like: 211, love: 37, haha: 3, sad: 1 },
        comments: ["That last line belongs on a poster."],
        shares: 22,
    },
];

const reactionMeta: Record<Reaction, { label: string; icon: ReactElement; color: string }> = {
    like: { label: "Like", icon: <FaThumbsUp />, color: "text-blue-600" },
    love: { label: "Love", icon: <FaHeart />, color: "text-rose-600" },
    haha: { label: "Haha", icon: <FaLaughSquint />, color: "text-amber-500" },
    sad: { label: "Sad", icon: <FaSadTear />, color: "text-orange-500" },
};

const navItems: Array<{ key: ViewKey; label: string; icon: ReactElement }> = [
    { key: "home", label: "Home", icon: <FaHome /> },
    { key: "friends", label: "Friends", icon: <FaUserFriends /> },
    { key: "watch", label: "Watch", icon: <FaTv /> },
    { key: "marketplace", label: "Marketplace", icon: <FaStore /> },
    { key: "groups", label: "Groups", icon: <FaUsers /> },
];

const shortcuts: Array<{ key: ViewKey; label: string; icon: ReactElement }> = [
    { key: "events", label: "Events", icon: <FaCalendarAlt /> },
    { key: "saved", label: "Saved", icon: <FaBookmark /> },
    { key: "gaming", label: "Gaming", icon: <FaGamepad /> },
    { key: "profile", label: "Profile", icon: <FaCamera /> },
];

const marketplace = [
    { title: "MacBook Pro M2", price: "$1,120", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80" },
    { title: "City Bicycle", price: "$180", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=80" },
    { title: "Studio Chair", price: "$65", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=500&q=80" },
];

const initialMessages: Message[] = [
    { id: 1, from: "them", text: "Are you joining the meetup?" },
    { id: 2, from: "me", text: "Yes, I am finishing the demo today." },
];

function privacyIcon(privacy: Privacy) {
    if (privacy === "Public") return <FaGlobeAmericas />;
    if (privacy === "Only me") return <FaLock />;
    return <FaUserFriends />;
}

function totalReactions(post: Post) {
    return Object.values(post.reactions).reduce((sum, count) => sum + count, 0);
}

export default function AdminDashboard() {
    const [activeView, setActiveView] = useState<ViewKey>("home");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [postText, setPostText] = useState("");
    const [postPrivacy, setPostPrivacy] = useState<Privacy>("Friends");
    const [query, setQuery] = useState("");
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [messengerOpen, setMessengerOpen] = useState(false);
    const [activeChat, setActiveChat] = useState<Person>(people[0]);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [messageText, setMessageText] = useState("");
    const [friends, setFriends] = useState(people.slice(0, 3));
    const [requests, setRequests] = useState(people.slice(3));
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const filteredPosts = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return posts;

        return posts.filter((post) => {
            return (
                post.text.toLowerCase().includes(term) ||
                post.author.name.toLowerCase().includes(term) ||
                post.location?.toLowerCase().includes(term)
            );
        });
    }, [posts, query]);

    const savedPosts = posts.filter((post) => post.saved);
    const viewTitle = [...navItems, ...shortcuts].find((item) => item.key === activeView)?.label ?? "Home";

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoggedIn(true);
    }

    function createPost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const cleanText = postText.trim();
        if (!cleanText) return;

        const newPost: Post = {
            id: Date.now(),
            author: me,
            time: "now",
            privacy: postPrivacy,
            text: cleanText,
            liked: false,
            saved: false,
            reactions: { like: 0, love: 0, haha: 0, sad: 0 },
            comments: [],
            shares: 0,
        };

        setPosts((currentPosts) => [newPost, ...currentPosts]);
        setPostText("");
        setActiveView("home");
    }

    function reactToPost(postId: number, reaction: Reaction) {
        setPosts((currentPosts) =>
            currentPosts.map((post) => {
                if (post.id !== postId) return post;

                const nextReactions = { ...post.reactions };
                if (post.reaction) {
                    nextReactions[post.reaction] = Math.max(0, nextReactions[post.reaction] - 1);
                }
                nextReactions[reaction] += 1;

                return {
                    ...post,
                    liked: true,
                    reaction,
                    reactions: nextReactions,
                };
            }),
        );
    }

    function toggleSave(postId: number) {
        setPosts((currentPosts) =>
            currentPosts.map((post) => (post.id === postId ? { ...post, saved: !post.saved } : post)),
        );
    }

    function sharePost(postId: number) {
        setPosts((currentPosts) =>
            currentPosts.map((post) => (post.id === postId ? { ...post, shares: post.shares + 1 } : post)),
        );
    }

    function addComment(postId: number, comment: string) {
        const cleanComment = comment.trim();
        if (!cleanComment) return;

        setPosts((currentPosts) =>
            currentPosts.map((post) =>
                post.id === postId ? { ...post, comments: [...post.comments, cleanComment] } : post,
            ),
        );
    }

    function acceptFriend(person: Person) {
        setFriends((currentFriends) => [person, ...currentFriends]);
        setRequests((currentRequests) => currentRequests.filter((request) => request.id !== person.id));
    }

    function removeRequest(personId: number) {
        setRequests((currentRequests) => currentRequests.filter((request) => request.id !== personId));
    }

    function sendMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const cleanMessage = messageText.trim();
        if (!cleanMessage) return;

        setMessages((currentMessages) => [
            ...currentMessages,
            { id: Date.now(), from: "me", text: cleanMessage },
        ]);
        setMessageText("");
    }

    if (!isLoggedIn) {
        return (
            <main className="min-h-screen bg-[#f0f2f5] px-5 py-10 text-[#1c1e21]">
                <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1877f2] text-3xl text-white shadow-lg">
                            <FaFacebookF />
                        </div>
                        <h1 className="text-5xl font-bold tracking-normal text-[#1877f2] sm:text-6xl">facebook</h1>
                        <p className="mt-4 max-w-xl text-2xl leading-tight">
                            Connect with friends and the world around you in a complete React social platform.
                        </p>
                    </div>

                    <form
                        className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-5 shadow-xl"
                        onSubmit={handleLogin}
                    >
                        <input
                            className="h-13 rounded-md border border-gray-300 px-4 text-lg outline-none transition focus:border-[#1877f2] focus:ring-2 focus:ring-blue-100"
                            type="email"
                            placeholder="Email address or phone number"
                            value={credentials.email}
                            onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                            required
                        />
                        <input
                            className="h-13 rounded-md border border-gray-300 px-4 text-lg outline-none transition focus:border-[#1877f2] focus:ring-2 focus:ring-blue-100"
                            type="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                            required
                        />
                        <button className="h-12 rounded-md bg-[#1877f2] text-xl font-bold text-white transition hover:bg-[#166fe5]">
                            Log in
                        </button>
                        <button type="button" className="text-sm font-medium text-[#1877f2] hover:underline">
                            Forgotten password?
                        </button>
                        <div className="h-px bg-gray-200" />
                        <button
                            type="button"
                            className="mx-auto h-12 rounded-md bg-[#42b72a] px-5 text-lg font-bold text-white transition hover:bg-[#36a420]"
                            onClick={() => setIsLoggedIn(true)}
                        >
                            Create new account
                        </button>
                    </form>
                </section>
            </main>
        );
    }

    return (
        <main className={darkMode ? "min-h-screen bg-[#18191a] text-[#e4e6eb]" : "min-h-screen bg-[#f0f2f5] text-[#1c1e21]"}>
            <header className={`sticky top-0 z-40 flex h-14 items-center justify-between border-b px-3 shadow-sm ${darkMode ? "border-white/10 bg-[#242526]" : "border-gray-200 bg-white"}`}>
                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <button
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1877f2] text-xl text-white"
                        onClick={() => setActiveView("home")}
                        aria-label="Facebook home"
                    >
                        <FaFacebookF />
                    </button>
                    <label className={`hidden h-10 max-w-xs flex-1 items-center gap-2 rounded-full px-4 md:flex ${darkMode ? "bg-[#3a3b3c]" : "bg-[#f0f2f5]"}`}>
                        <FaSearch className="text-gray-500" />
                        <input
                            className="w-full bg-transparent text-sm outline-none"
                            placeholder="Search Facebook"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </label>
                </div>

                <nav className="hidden h-full flex-1 justify-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <button
                            key={item.key}
                            className={`flex h-full min-w-20 items-center justify-center border-b-4 px-5 text-xl transition ${
                                activeView === item.key
                                    ? "border-[#1877f2] text-[#1877f2]"
                                    : "border-transparent text-gray-500 hover:bg-gray-100"
                            } ${darkMode && activeView !== item.key ? "hover:bg-white/10" : ""}`}
                            onClick={() => setActiveView(item.key)}
                            title={item.label}
                            aria-label={item.label}
                        >
                            {item.icon}
                        </button>
                    ))}
                </nav>

                <div className="flex flex-1 items-center justify-end gap-2">
                    <button
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${darkMode ? "bg-[#3a3b3c]" : "bg-gray-200"}`}
                        onClick={() => setDarkMode((value) => !value)}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    <button
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full ${darkMode ? "bg-[#3a3b3c]" : "bg-gray-200"}`}
                        onClick={() => setMessengerOpen((value) => !value)}
                        aria-label="Messenger"
                    >
                        <FaFacebookMessenger />
                        <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 text-xs text-white">3</span>
                    </button>
                    <button
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full ${darkMode ? "bg-[#3a3b3c]" : "bg-gray-200"}`}
                        onClick={() => setNotificationsOpen((value) => !value)}
                        aria-label="Notifications"
                    >
                        <FaBell />
                        <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 text-xs text-white">5</span>
                    </button>
                    <button
                        className="flex items-center gap-2 rounded-full px-1.5 py-1 transition hover:bg-black/5"
                        onClick={() => setActiveView("profile")}
                    >
                        <img src={me.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                        <span className="hidden text-sm font-semibold lg:block">Chiranjibi</span>
                    </button>
                </div>
            </header>

            <section className="grid grid-cols-1 gap-5 px-3 py-4 lg:grid-cols-[280px_minmax(0,680px)_320px] xl:px-6">
                <aside className="hidden lg:block">
                    <div className="sticky top-18 space-y-1">
                        <SideButton person={me} label={me.name} active={activeView === "profile"} onClick={() => setActiveView("profile")} />
                        {[...navItems, ...shortcuts].map((item) => (
                            <button
                                key={item.key}
                                className={`flex w-full items-center gap-3 rounded-md p-2 text-left font-semibold transition ${
                                    activeView === item.key ? "bg-blue-50 text-[#1877f2]" : darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"
                                }`}
                                onClick={() => setActiveView(item.key)}
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-[#1877f2]">
                                    {item.icon}
                                </span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </aside>

                <section className="mx-auto w-full max-w-[680px] space-y-4">
                    {activeView === "home" && (
                        <>
                            <Stories darkMode={darkMode} onCreate={() => setPostText("Starting a new story today...")} />
                            <Composer
                                darkMode={darkMode}
                                postText={postText}
                                privacy={postPrivacy}
                                setPostText={setPostText}
                                setPrivacy={setPostPrivacy}
                                onSubmit={createPost}
                            />
                            {filteredPosts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    darkMode={darkMode}
                                    onReact={reactToPost}
                                    onComment={addComment}
                                    onShare={sharePost}
                                    onSave={toggleSave}
                                />
                            ))}
                        </>
                    )}

                    {activeView !== "home" && (
                        <FeatureView
                            title={viewTitle}
                            activeView={activeView}
                            darkMode={darkMode}
                            friends={friends}
                            requests={requests}
                            savedPosts={savedPosts}
                            onAccept={acceptFriend}
                            onDecline={removeRequest}
                            onOpenProfile={() => setActiveView("profile")}
                        />
                    )}
                </section>

                <aside className="hidden xl:block">
                    <div className="sticky top-18 space-y-4">
                        <Panel darkMode={darkMode} title="Sponsored">
                            {marketplace.slice(0, 2).map((item) => (
                                <button key={item.title} className="flex w-full items-center gap-3 rounded-md p-2 text-left transition hover:bg-black/5">
                                    <img src={item.image} alt="" className="h-16 w-16 rounded-md object-cover" />
                                    <span>
                                        <strong className="block text-sm">{item.title}</strong>
                                        <span className="text-xs text-gray-500">{item.price} near you</span>
                                    </span>
                                </button>
                            ))}
                        </Panel>

                        <Panel darkMode={darkMode} title="Friend requests">
                            {requests.slice(0, 2).map((person) => (
                                <RequestCard key={person.id} person={person} compact onAccept={acceptFriend} onDecline={removeRequest} />
                            ))}
                        </Panel>

                        <Panel darkMode={darkMode} title="Contacts">
                            {friends.map((person) => (
                                <button
                                    key={person.id}
                                    className="flex w-full items-center gap-3 rounded-md p-2 text-left transition hover:bg-black/5"
                                    onClick={() => {
                                        setActiveChat(person);
                                        setMessengerOpen(true);
                                    }}
                                >
                                    <span className="relative">
                                        <img src={person.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                                        {person.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />}
                                    </span>
                                    <span className="text-sm font-semibold">{person.name}</span>
                                </button>
                            ))}
                        </Panel>
                    </div>
                </aside>
            </section>

            {notificationsOpen && (
                <Popover darkMode={darkMode} title="Notifications" onClose={() => setNotificationsOpen(false)}>
                    {["Maya commented on your post", "Samir invited you to React Nepal", "Nisha shared a new photo", "Aarav accepted your request"].map((text) => (
                        <div key={text} className="rounded-md p-3 text-sm font-medium hover:bg-black/5">
                            {text}
                            <span className="block text-xs text-[#1877f2]">Just now</span>
                        </div>
                    ))}
                </Popover>
            )}

            {messengerOpen && (
                <Messenger
                    darkMode={darkMode}
                    activeChat={activeChat}
                    messages={messages}
                    messageText={messageText}
                    setMessageText={setMessageText}
                    onSubmit={sendMessage}
                    onClose={() => setMessengerOpen(false)}
                />
            )}
        </main>
    );
}

function SideButton({ person, label, active, onClick }: { person: Person; label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            className={`flex w-full items-center gap-3 rounded-md p-2 text-left font-semibold transition ${active ? "bg-blue-50 text-[#1877f2]" : "hover:bg-gray-200"}`}
            onClick={onClick}
        >
            <img src={person.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
            {label}
        </button>
    );
}

function Panel({ darkMode, title, children }: { darkMode: boolean; title: string; children: ReactNode }) {
    return (
        <section className={`rounded-lg p-3 shadow-sm ${darkMode ? "bg-[#242526]" : "bg-white"}`}>
            <h2 className="mb-2 text-base font-bold text-gray-500">{title}</h2>
            {children}
        </section>
    );
}

function Stories({ darkMode, onCreate }: { darkMode: boolean; onCreate: () => void }) {
    return (
        <section className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            <button className={`overflow-hidden rounded-lg shadow-sm ${darkMode ? "bg-[#242526]" : "bg-white"}`} onClick={onCreate}>
                <img src={me.avatar} alt="" className="h-32 w-full object-cover" />
                <div className="relative px-2 pb-3 pt-5 text-center text-xs font-bold">
                    <span className="absolute left-1/2 top-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#1877f2] text-white">
                        <FaPlusCircle />
                    </span>
                    Create story
                </div>
            </button>
            {people.slice(0, 4).map((person) => (
                <button key={person.id} className="relative h-44 overflow-hidden rounded-lg text-left text-white shadow-sm">
                    <img src={person.cover} alt="" className="h-full w-full object-cover" />
                    <span className="absolute left-2 top-2 rounded-full border-4 border-[#1877f2]">
                        <img src={person.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-xs font-bold">
                        {person.name}
                    </span>
                </button>
            ))}
        </section>
    );
}

function Composer({
    darkMode,
    postText,
    privacy,
    setPostText,
    setPrivacy,
    onSubmit,
}: {
    darkMode: boolean;
    postText: string;
    privacy: Privacy;
    setPostText: (value: string) => void;
    setPrivacy: (value: Privacy) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
    return (
        <form className={`rounded-lg p-4 shadow-sm ${darkMode ? "bg-[#242526]" : "bg-white"}`} onSubmit={onSubmit}>
            <div className="flex gap-3">
                <img src={me.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                <textarea
                    className={`min-h-12 flex-1 resize-none rounded-3xl px-4 py-3 outline-none ${darkMode ? "bg-[#3a3b3c]" : "bg-[#f0f2f5]"}`}
                    placeholder={`What's on your mind, Chiranjibi?`}
                    value={postText}
                    onChange={(event) => setPostText(event.target.value)}
                />
            </div>
            <div className="my-3 h-px bg-gray-200/70" />
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                    <ComposerAction icon={<FaVideo className="text-red-500" />} label="Live" />
                    <ComposerAction icon={<FaImage className="text-green-500" />} label="Photo" />
                    <ComposerAction icon={<FaMapMarkerAlt className="text-rose-500" />} label="Check in" />
                </div>
                <div className="flex items-center gap-2">
                    <select
                        className={`rounded-md px-2 py-2 text-sm font-semibold outline-none ${darkMode ? "bg-[#3a3b3c]" : "bg-gray-100"}`}
                        value={privacy}
                        onChange={(event) => setPrivacy(event.target.value as Privacy)}
                    >
                        <option>Public</option>
                        <option>Friends</option>
                        <option>Only me</option>
                    </select>
                    <button className="rounded-md bg-[#1877f2] px-5 py-2 font-bold text-white disabled:opacity-50" disabled={!postText.trim()}>
                        Post
                    </button>
                </div>
            </div>
        </form>
    );
}

function ComposerAction({ icon, label }: { icon: ReactElement; label: string }) {
    return (
        <button type="button" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-black/5">
            {icon}
            {label}
        </button>
    );
}

function PostCard({
    post,
    darkMode,
    onReact,
    onComment,
    onShare,
    onSave,
}: {
    post: Post;
    darkMode: boolean;
    onReact: (postId: number, reaction: Reaction) => void;
    onComment: (postId: number, comment: string) => void;
    onShare: (postId: number) => void;
    onSave: (postId: number) => void;
}) {
    const [commentText, setCommentText] = useState("");

    function submitComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onComment(post.id, commentText);
        setCommentText("");
    }

    return (
        <article className={`overflow-hidden rounded-lg shadow-sm ${darkMode ? "bg-[#242526]" : "bg-white"}`}>
            <div className="flex items-start justify-between p-4">
                <div className="flex gap-3">
                    <img src={post.author.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <div>
                        <h2 className="font-bold">{post.author.name}</h2>
                        <p className="flex items-center gap-1 text-xs text-gray-500">
                            {post.time} · {privacyIcon(post.privacy)} {post.privacy}
                        </p>
                    </div>
                </div>
                <button className="rounded-full p-2 text-gray-500 hover:bg-black/5" onClick={() => onSave(post.id)} aria-label="Save post">
                    <FaBookmark className={post.saved ? "text-[#1877f2]" : ""} />
                </button>
            </div>
            <p className="px-4 pb-3 leading-relaxed">{post.text}</p>
            {post.location && <p className="px-4 pb-3 text-sm font-semibold text-gray-500">At {post.location}</p>}
            {post.image && <img src={post.image} alt="" className="max-h-[520px] w-full object-cover" />}

            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                    <span className="flex -space-x-1">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-xs text-white"><FaThumbsUp /></span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs text-white"><FaHeart /></span>
                    </span>
                    {totalReactions(post)}
                </span>
                <span>{post.comments.length} comments · {post.shares} shares</span>
            </div>

            <div className="mx-4 grid grid-cols-3 border-y border-gray-200/80 py-1">
                {(["like", "love", "haha"] as Reaction[]).map((reaction) => (
                    <button
                        key={reaction}
                        className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-bold transition hover:bg-black/5 ${
                            post.reaction === reaction ? reactionMeta[reaction].color : "text-gray-500"
                        }`}
                        onClick={() => onReact(post.id, reaction)}
                    >
                        {reactionMeta[reaction].icon}
                        {reactionMeta[reaction].label}
                    </button>
                ))}
            </div>

            <div className="space-y-3 p-4">
                {post.comments.map((comment, index) => (
                    <div key={`${post.id}-${index}`} className="flex gap-2">
                        <img src={people[index % people.length].avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                        <div className={`rounded-2xl px-3 py-2 text-sm ${darkMode ? "bg-[#3a3b3c]" : "bg-[#f0f2f5]"}`}>
                            <strong>{people[index % people.length].name}</strong>
                            <p>{comment}</p>
                        </div>
                    </div>
                ))}
                <form className="flex items-center gap-2" onSubmit={submitComment}>
                    <img src={me.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                    <input
                        className={`h-10 flex-1 rounded-full px-4 text-sm outline-none ${darkMode ? "bg-[#3a3b3c]" : "bg-[#f0f2f5]"}`}
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(event) => setCommentText(event.target.value)}
                    />
                    <button className="rounded-full p-2 text-[#1877f2]" aria-label="Comment">
                        <FaPaperPlane />
                    </button>
                </form>
                <button
                    className="flex w-full items-center justify-center gap-2 rounded-md py-2 text-sm font-bold text-gray-500 transition hover:bg-black/5"
                    onClick={() => onShare(post.id)}
                >
                    <FaShare />
                    Share
                </button>
            </div>
        </article>
    );
}

function FeatureView({
    title,
    activeView,
    darkMode,
    friends,
    requests,
    savedPosts,
    onAccept,
    onDecline,
    onOpenProfile,
}: {
    title: string;
    activeView: ViewKey;
    darkMode: boolean;
    friends: Person[];
    requests: Person[];
    savedPosts: Post[];
    onAccept: (person: Person) => void;
    onDecline: (personId: number) => void;
    onOpenProfile: () => void;
}) {
    if (activeView === "profile") {
        return (
            <section className={`overflow-hidden rounded-lg shadow-sm ${darkMode ? "bg-[#242526]" : "bg-white"}`}>
                <img src={me.cover} alt="" className="h-64 w-full object-cover" />
                <div className="px-5 pb-5">
                    <div className="-mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-end gap-4">
                            <img src={me.avatar} alt="" className="h-32 w-32 rounded-full border-4 border-white object-cover" />
                            <div className="pb-3">
                                <h1 className="text-3xl font-bold">{me.name}</h1>
                                <p className="font-semibold text-gray-500">{friends.length} friends</p>
                            </div>
                        </div>
                        <button className="rounded-md bg-[#1877f2] px-4 py-2 font-bold text-white">Edit profile</button>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        {["Posts", "About", "Photos"].map((tab) => (
                            <button key={tab} className="rounded-md bg-black/5 p-3 font-bold hover:bg-black/10">{tab}</button>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (activeView === "friends") {
        return (
            <section className="space-y-4">
                <FeatureHeader title="Friends" action="Find friends" />
                <div className="grid gap-3 sm:grid-cols-2">
                    {requests.map((person) => (
                        <RequestCard key={person.id} person={person} onAccept={onAccept} onDecline={onDecline} />
                    ))}
                    {friends.map((person) => (
                        <PersonTile key={person.id} person={person} darkMode={darkMode} />
                    ))}
                </div>
            </section>
        );
    }

    if (activeView === "saved") {
        return (
            <section className="space-y-4">
                <FeatureHeader title="Saved" action={`${savedPosts.length} items`} />
                {savedPosts.length ? savedPosts.map((post) => <SavedItem key={post.id} post={post} darkMode={darkMode} />) : <EmptyState text="Saved posts will appear here." />}
            </section>
        );
    }

    if (activeView === "marketplace") {
        return (
            <section className="space-y-4">
                <FeatureHeader title="Marketplace" action="Sell item" />
                <div className="grid gap-3 sm:grid-cols-3">
                    {marketplace.map((item) => (
                        <div key={item.title} className={`overflow-hidden rounded-lg shadow-sm ${darkMode ? "bg-[#242526]" : "bg-white"}`}>
                            <img src={item.image} alt="" className="h-44 w-full object-cover" />
                            <div className="p-3">
                                <strong className="block">{item.price}</strong>
                                <span className="text-sm text-gray-500">{item.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    const cardsByView: Partial<Record<ViewKey, string[]>> = {
        watch: ["Live now: React UI workshop", "Shorts from creators", "Nepal travel documentary"],
        groups: ["React Nepal", "Kathmandu Developers", "Frontend Career Club"],
        events: ["Community meetup", "Design review night", "Startup demo day"],
        gaming: ["Word battle", "Chess arena", "Puzzle sprint"],
    };
    const cards = cardsByView[activeView] ?? [];

    return (
        <section className="space-y-4">
            <FeatureHeader title={title} action="Create" />
            <div className="grid gap-3">
                {cards.map((card, index) => (
                    <button
                        key={card}
                        className={`rounded-lg p-5 text-left shadow-sm transition hover:-translate-y-0.5 ${darkMode ? "bg-[#242526]" : "bg-white"}`}
                        onClick={index === 0 ? onOpenProfile : undefined}
                    >
                        <span className="text-lg font-bold">{card}</span>
                        <span className="mt-1 block text-sm text-gray-500">New activity from your network</span>
                    </button>
                ))}
            </div>
        </section>
    );
}

function FeatureHeader({ title, action }: { title: string; action: string }) {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
            <button className="rounded-md bg-blue-100 px-4 py-2 text-sm font-bold text-[#1877f2]">{action}</button>
        </div>
    );
}

function RequestCard({ person, compact, onAccept, onDecline }: { person: Person; compact?: boolean; onAccept: (person: Person) => void; onDecline: (personId: number) => void }) {
    return (
        <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="flex gap-3">
                <img src={person.avatar} alt="" className={compact ? "h-12 w-12 rounded-full object-cover" : "h-20 w-20 rounded-md object-cover"} />
                <div className="min-w-0 flex-1">
                    <strong className="block truncate">{person.name}</strong>
                    <span className="text-sm text-gray-500">{person.mutual} mutual friends</span>
                    <div className="mt-3 flex gap-2">
                        <button className="flex flex-1 items-center justify-center gap-1 rounded-md bg-[#1877f2] px-2 py-2 text-sm font-bold text-white" onClick={() => onAccept(person)}>
                            <FaCheck /> Confirm
                        </button>
                        <button className="flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-200 px-2 py-2 text-sm font-bold" onClick={() => onDecline(person.id)}>
                            <FaTimes /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PersonTile({ person, darkMode }: { person: Person; darkMode: boolean }) {
    return (
        <div className={`rounded-lg p-3 shadow-sm ${darkMode ? "bg-[#242526]" : "bg-white"}`}>
            <img src={person.cover} alt="" className="h-32 w-full rounded-md object-cover" />
            <div className="mt-3 flex items-center gap-3">
                <img src={person.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                <div>
                    <strong>{person.name}</strong>
                    <p className="text-sm text-gray-500">{person.role}</p>
                </div>
            </div>
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-blue-100 py-2 font-bold text-[#1877f2]">
                <FaUserPlus />
                Add to favorites
            </button>
        </div>
    );
}

function SavedItem({ post, darkMode }: { post: Post; darkMode: boolean }) {
    return (
        <div className={`flex gap-3 rounded-lg p-3 shadow-sm ${darkMode ? "bg-[#242526]" : "bg-white"}`}>
            {post.image && <img src={post.image} alt="" className="h-24 w-24 rounded-md object-cover" />}
            <div>
                <strong className="line-clamp-2">{post.text}</strong>
                <p className="text-sm text-gray-500">Saved from {post.author.name}</p>
            </div>
        </div>
    );
}

function EmptyState({ text }: { text: string }) {
    return <div className="rounded-lg bg-white p-8 text-center font-semibold text-gray-500 shadow-sm">{text}</div>;
}

function Popover({ darkMode, title, children, onClose }: { darkMode: boolean; title: string; children: ReactNode; onClose: () => void }) {
    return (
        <section className={`fixed right-4 top-16 z-50 w-[min(360px,calc(100vw-32px))] rounded-lg p-3 shadow-2xl ${darkMode ? "bg-[#242526]" : "bg-white"}`}>
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xl font-bold">{title}</h2>
                <button className="rounded-full p-2 hover:bg-black/5" onClick={onClose} aria-label="Close">
                    <FaTimes />
                </button>
            </div>
            {children}
        </section>
    );
}

function Messenger({
    darkMode,
    activeChat,
    messages,
    messageText,
    setMessageText,
    onSubmit,
    onClose,
}: {
    darkMode: boolean;
    activeChat: Person;
    messages: Message[];
    messageText: string;
    setMessageText: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
}) {
    return (
        <section className={`fixed bottom-4 right-4 z-50 flex h-[460px] w-[min(360px,calc(100vw-32px))] flex-col overflow-hidden rounded-lg shadow-2xl ${darkMode ? "bg-[#242526]" : "bg-white"}`}>
            <header className="flex items-center justify-between border-b border-gray-200/70 p-3">
                <div className="flex items-center gap-2">
                    <img src={activeChat.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <div>
                        <strong>{activeChat.name}</strong>
                        <span className="block text-xs text-green-500">Active now</span>
                    </div>
                </div>
                <button className="rounded-full p-2 hover:bg-black/5" onClick={onClose} aria-label="Close chat">
                    <FaTimes />
                </button>
            </header>
            <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.from === "me" ? "justify-end" : "justify-start"}`}>
                        <span className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${message.from === "me" ? "bg-[#1877f2] text-white" : darkMode ? "bg-[#3a3b3c]" : "bg-gray-100"}`}>
                            {message.text}
                        </span>
                    </div>
                ))}
            </div>
            <form className="flex items-center gap-2 border-t border-gray-200/70 p-3" onSubmit={onSubmit}>
                <input
                    className={`h-10 flex-1 rounded-full px-4 outline-none ${darkMode ? "bg-[#3a3b3c]" : "bg-gray-100"}`}
                    placeholder="Aa"
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                />
                <button className="rounded-full bg-[#1877f2] p-3 text-white" aria-label="Send message">
                    <FaPaperPlane />
                </button>
            </form>
        </section>
    );
}

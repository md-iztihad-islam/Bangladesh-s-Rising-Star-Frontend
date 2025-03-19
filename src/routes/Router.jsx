import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import WatchLive from "../pages/WatchLive";
import WatchHighlights from "../pages/Highlights/WatchHighlights";
import Store from "../pages/Store";
import HighlightVideo from "../pages/Highlights/HighlightsVideo";
import Registration from "../pages/Registration/Registration";
import Signin from "../pages/Signin";
import PlayerRegistration from "../pages/Registration/PlayerRegistration";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard/Dashboard";
import AboutControl from "../pages/Dashboard/about/AboutControl";
import LiveControl from "../pages/Dashboard/live/LiveControl";
import EditLive from "../pages/Dashboard/live/EditLive";
import SearchPlayer from "../pages/Dashboard/player/SearchPlayer";
import SearchProfile from "../pages/Dashboard/player/SearchProfile";
import NewsControl from "../pages/Dashboard/news/NewsControl";
import TournamentControl from "../pages/Dashboard/tournament/TournamentControl";
import AddTeam from "../pages/Dashboard/tournament/AddTeam";
import AddPlayer from "../pages/Dashboard/tournament/AddPlayer";
import PlayerProfile from "../pages/Dashboard/tournament/PlayerProfile";
import AddMatch from "../pages/Dashboard/tournament/AddMatch";
import UpdateMatch from "../pages/Dashboard/tournament/UpdateMatch";
import Tournament from "../pages/Tournament/Tournaments";
import Fixtures from "../pages/Tournament/Fixtures";
import Home from "../pages/Home/Home";
import TeamPlayers from "../pages/Home/TeamPlayers";
import UpdateTeam from "../pages/Dashboard/tournament/UpdateTeam";
import Standings from "../pages/Standings/Standings";
import PointTable from "../pages/Standings/PointTable";
import ProductControl from "../pages/Dashboard/product/ProductControl";
import { AdminRoute, ProtectedRoute } from "../components/Extra/ProtectedRoutes";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/:tournamentId/:teamId",
                element: <TeamPlayers />
            },
            {
                path: "/register",
                element: <Registration />
            },
            {
                path: "/register/playerregistration",
                element: <PlayerRegistration />
            },
            {
                path: "/signin",
                element: <Signin />
            },
            {
                path: "/profile",
                element: <ProtectedRoute> <Profile /> </ProtectedRoute>
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/live",
                element: <WatchLive />
            },
            {
                path: "/highlights",
                element: <WatchHighlights />
            },
            {
                path: "/highlights/:matchId/:tournamentId",
                element: <HighlightVideo />
            },
            {
                path: "/store",
                element: <Store />
            },
            {
                path: "/standings",
                element: <Standings />
            },
            {
                path: "/standings/pointtable/:tournamentId",
                element: <PointTable />
            },
            {
                path: "/tournament",
                element: <Tournament />
            },
            {
                path: "/tournament/:tournamentId/fixtures",
                element: <Fixtures />
            },
            {
                path: "/admin",
                element: <AdminRoute> <Dashboard /> </AdminRoute>,
            },
            {
                path: "/admin/aboutcontrol",
                element: <AdminRoute> <AboutControl /> </AdminRoute>
            },
            {
                path: "/admin/livecontrol",
                element: <AdminRoute> <LiveControl /> </AdminRoute> 
            },
            {
                path: "/admin/livecontrol/:id",
                element: <AdminRoute> <EditLive /> </AdminRoute> 
            },
            {
                path: "/admin/searchplayer",
                element: <AdminRoute> <SearchPlayer /> </AdminRoute>
            },
            {
                path: "/admin/searchplayer/:email",
                element: <AdminRoute> <SearchProfile /> </AdminRoute>
            },
            {
                path: "/admin/newscontrol",
                element: <AdminRoute> <NewsControl /> </AdminRoute>
            },
            {
                path: "/admin/productcontrol",
                element: <AdminRoute> <ProductControl /> </AdminRoute>
            },
            {
                path: "/admin/tournamentcontrol",
                element: <AdminRoute> <TournamentControl /> </AdminRoute>
            },
            {
                path: "/admin/tournamentcontrol/addmatch/:tournamentId/:matchId",
                element: <AdminRoute> <UpdateMatch /> </AdminRoute>
            },
            {
                path: "/admin/tournamentcontrol/addteam/:tournamentId",
                element: <AdminRoute> <AddTeam /> </AdminRoute>
            },
            {
                path: "/admin/tournamentcontrol/addteam/:tournamentId/addplayer/:teamId",
                element: <AdminRoute> <AddPlayer /> </AdminRoute>
            },
            {
                path: "/admin/tournamentcontrol/addteam/:tournamentId/addplayer/:teamId/:playerId",
                element: <AdminRoute> <PlayerProfile /> </AdminRoute>
            },
            {
                path: "/admin/tournamentcontrol/addmatch/:tournamentId",
                element: <AdminRoute> <AddMatch /> </AdminRoute>
            },
            {
                path: "/admin/tournamentcontrol/addteam/:tournamentId/updateteam/:teamId",
                element: <AdminRoute> <UpdateTeam /> </AdminRoute>
            },
        ]
    }
]);

export default appRouter;
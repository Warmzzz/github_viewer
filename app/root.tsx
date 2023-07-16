import { cssBundleHref } from "@remix-run/css-bundle";
import { redirect, type LinkDescriptor, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { V2_MetaFunction } from "@remix-run/node";
import Header from "~/components/Header/Header";

import GlobalStyle from "~/styles/globals.css";
const CustomLinks: Array<LinkDescriptor> = [
  { rel: "stylesheet", href: GlobalStyle },
];

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
      ...CustomLinks,
      { rel: "stylesheet", href: cssBundleHref }
    ]
    : []),
];

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Github Profil Viewer" },
    { name: "description", content: "This website is used to view some Github profil by a username !" },
  ];
};


export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>

        <Header />

        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

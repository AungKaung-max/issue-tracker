"use client";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import Container from "./components/Container";
import { Skeleton } from "@/app/components";

const Navbar = () => {
  return (
    <nav className="border-b px-5 mb-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" className="space-x-3">
            <Link href="/">
              <FaBug></FaBug>
            </Link>
            <NavLink></NavLink>
          </Flex>
          <Box>
            <AuthStatus></AuthStatus>
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLink = () => {
  const currentPath = usePathname();
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return <Skeleton width="3rem"></Skeleton>;
  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Flex>
            <Avatar
              src={session!.user!.image!}
              size="2"
              radius="full"
              fallback="?"
              className="cursor-pointer"
            ></Avatar>
          </Flex>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size="2">
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>

          <Link href="/api/auth/signout">
            {" "}
            <DropdownMenu.Item>Logout</DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;

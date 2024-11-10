<script lang="ts">
  import { Link, LayoutGrid, User, LogOut } from 'lucide-svelte';
  import { AvatarImage, AvatarFallback, Avatar } from '../ui/avatar';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '../ui/dropdown-menu';
  import { Button } from '../ui/button';
  import { enhance } from '$app/forms';
</script>

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline" class="relative h-8 w-8 rounded-full">
      <Avatar class="h-8 w-8">
        <AvatarImage src="#" alt="Avatar" />
        <AvatarFallback class="bg-transparent">JD</AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent class="w-56">
    <DropdownMenuLabel class="font-normal">
      <div class="flex flex-col space-y-1">
        <p class="text-sm font-medium leading-none">John Doe</p>
        <p class="text-xs leading-none text-muted-foreground">
          johndoe@example.com
        </p>
      </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem class="hover:cursor-pointer">
        <a href="/account" class="flex items-center">
          <User class="w-4 h-4 mr-3 text-muted-foreground" />
          Mi cuenta
        </a>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <form action="/?/logout" use:enhance method="post">
      <button type="submit" class="w-full">
        <DropdownMenuItem class="hover:cursor-pointer">
          <LogOut class="w-4 h-4 mr-3 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </button>
    </form>
  </DropdownMenuContent>
</DropdownMenu>

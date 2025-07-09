{
  description = "Self-contained dev environment for Node.js + Next.js + pnpm project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        projectDir = builtins.toString ./.;
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs_24
            pkgs.pnpm
            pkgs.git
            pkgs.zsh
          ];

          # Set up local pnpm store and configs
          shellHook = ''
            export PNPM_HOME="$PWD/.pnpm"
            export PNPM_STORE_PATH="$PWD/.pnpm-store"
            export PATH="$PNPM_HOME:$PATH"
            export NPM_CONFIG_USERCONFIG="$PWD/.npmrc"
            export PNPM_HOME="$PWD/.pnpm"
            export PNPM_CONFIG_USERCONFIG="$PWD/.pnpmrc"
            export SHELL=$(which zsh)

            # Create pnpm store dir if it doesn't exist
            mkdir -p "$PNPM_STORE_PATH" "$PNPM_HOME"

            # Source project-local .zshrc if it exists
            if [ -f "$PWD/.zshrc" ]; then
              echo "Sourcing project .zshrc"
              source "$PWD/.zshrc"
            fi

            echo "Node: $(node --version)"
            echo "pnpm: $(pnpm --version)"
            echo "Ready for Next.js development (self-contained configs)!"
          '';
        };
      });
}

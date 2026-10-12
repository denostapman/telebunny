{
  description = "TeleBunny";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
  };

  outputs =
    { nixpkgs, ... }:
    let
      inherit (nixpkgs) lib;

      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];

      perSystem =
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};

          tools = [
            pkgs.nodejs

            pkgs.nixd
            pkgs.nil
            pkgs.nixfmt
          ];

          shell = pkgs.mkShell {
            name = "telebunny";

            packages = tools;

            shellHook = ''
              export PATH="$PWD/node_modules/.bin:$PATH"
              export NPM_CONFIG_FUND=false
            '';
          };
        in
        {
          inherit shell;
          formatter = pkgs.nixfmt;
        };

      eachSystem = fn: lib.genAttrs systems (system: fn (perSystem system));
    in
    {
      devShells = eachSystem (rx24: {
        default = rx24.shell;
      });

      formatter = eachSystem (rx24: rx24.formatter);
    };
}

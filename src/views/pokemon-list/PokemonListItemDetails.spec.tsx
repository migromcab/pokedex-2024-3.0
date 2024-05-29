import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { renderComponent } from "../../tests/utils/component-renderer";
import { PokemonListItemDetails } from "./PokemonListItemDetails";
import { PokemonGender } from "../../models";

describe("Button", () => {
  it("Should render a button with the text indicated", () => {
    renderComponent(
      <PokemonListItemDetails
        pokemon={{
          name: "chimpocomon",
          imageUrl: "",
          id: 1,
          isFav: false,
          isHidden: true,
          tags: [],
          price: 1,
          level: 1,
          gender: PokemonGender.Female,
        }}
        onHidePokemonClick={vi.fn()}
        onFavPokemonClick={vi.fn()}
      />
    );
  });
});

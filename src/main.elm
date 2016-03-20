module Main where

import Html exposing ( div, text, Html, input )
import Html.Attributes exposing ( type' )
import Html.Events exposing ( on, targetValue )
import StartApp.Simple as StartApp
import Signal exposing ( Address, message )
import String

main =
  StartApp.start { model = model, view = view, update = update }

type alias Model = String
model : Model
model = "I'm a model!"

type Action = UpdateText String

update : Action -> Model -> Model
update action model =
  case action of
    UpdateText newStr -> newStr

view : Address Action -> Model -> Html
view address model =
  div []
    [
      input [
          type' "",
          on "input" targetValue (\str -> message address (UpdateText str))
      ] [],
      text (String.reverse model)
    ]

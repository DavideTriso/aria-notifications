# T CSS FRAMEWORK

## ABOUT

## DEPENDENCIES

**No dependencies**

## MAIN FEATURES

* Written with SCSS.
* Adoptable for **BEM-projects** (Block Element Modifier).
* Clear files and folders structure to work with and maintain.
* Virtually **0 KB**! **T** is a collection of useful sass functions, mixins and placeholers which drastically **reduces the development time, but does not add any KB to your CSS project**.
* In **T** each CSS property which accepts token values is a placeholer: extending placeholders to define CSS classes keeps your SCSS code readable and maintainable, while keeping the generated CSS as lightweight as possible.
* Truly responsive and **highly customisable flexbox-based grid system**: with **T** it is extremely simple to customise the number of breakpoints, the number of columns, the width of the containers, the columns gutters etc.

## GENERAL FOLDER STRUCTURE

```
.
|-- functions --------------|-- _import.scss
|                           |__ [scss functions files]
|
|-- css-placeholders -------|-- mixins--|-- _css-placeholders.scss
|                           |           |__ _generate-css-placeholders.scss
|                           |
|                           |-- _import.scss
|                           |-- _modify.scss
|                           |__ _settings.scss
|
|-- reset ------------------|-- _import.scss
|                           |__ [scss reset files]
|
|-- grid -------------------| -- mixins --|-- [grid mixins files]
|                           |-- _import.scss
|                           |-- _modify.scss
|                           |__ _settings.scss
|
|-- responsive-helpers -----|-- mixins --|-- [responsive helpers mixins files]
|                           |-- _import.scss
|                           |-- _modify.scss
|                           |__ _settings.scss
|
|-- ui-helpers--------------|-- mixins --|-- [ui helpers mixins files]
|                           |-- _import.scss
|                           |-- _modify.scss
|                           |__ _settings.scss
|
|-- settings ---------------|-- _breakpoints.scss
|                           |-- _default-settings.scss
|                           |__ _import.scss
|
|__ t-css-framework.scss

```

## FUNCTIONS


## CSS placeholders


## RESET


## GRID


## RESPONSIVE HELPERS


## UI HELPERS


## SETTINGS

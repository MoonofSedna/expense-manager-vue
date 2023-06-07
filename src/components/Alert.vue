<template>
  <div class="alert">
    <slot></slot>
  </div>
</template>
<style scoped>
.alert {
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  border: none;
  text-transform: uppercase;
  font-weight: 800;
  background-color: var(--white);
  color: var(--red);
  border-left: 0.5rem solid var(--red);
}
</style>

-- Execute depois de `npm run db:push` e ajuste os produtos conforme o cardapio.json.
-- estoque_atual NULL significa estoque ilimitado.
INSERT INTO categorias (nome, slug, peso_padrao) VALUES
  ('Nhoque tradicional caseiro', 'nhoque', '500g'),
  ('Nhocão recheado', 'nhocao', '500g'),
  ('Talharim artesanal', 'talharim', '500g'),
  ('Rondelli', 'rondelli', '500g'),
  ('Canelone', 'canelone', '500g'),
  ('Sofiatelli', 'sofiatelli', '500g'),
  ('Lasanha', 'lasanha', '1kg'),
  ('Tortéi', 'tortei', '500g'),
  ('Capeletti', 'capeletti', '500g'),
  ('Ravioli', 'ravioli', '500g'),
  ('Molhos artesanais', 'molhos', '500g')
ON CONFLICT (slug) DO NOTHING;

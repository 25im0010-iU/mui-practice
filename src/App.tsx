import { Favorite, FavoriteBorder, Delete, UploadFile } from '@mui/icons-material';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Switch,
  FormControlLabel,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
} from '@mui/material';

const netflixTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#141414',
      paper: '#1f1f1f',
    },
    primary: {
      main: '#E50914',
    },
  },
  typography: {
    fontFamily: [
      'Bebas Neue',
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      'Hiragino Sans',
      'Meiryo',
      'sans-serif',
    ].join(','),
  },
});

const sampleImages = [
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&q=80',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80',
];

function App() {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('映画');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [onlyFavorite, setOnlyFavorite] = useState(false);
  const [mediaList, setMediaList] = useState([
    {
      id: 1,
      title: 'インセプション',
      category: '映画',
      isFavorite: true,
      imageUrl: sampleImages[0],
    },
    {
      id: 2,
      title: '鬼滅の刃',
      category: 'アニメ',
      isFavorite: false,
      imageUrl: sampleImages[1],
    },
  ]);

  // ファイルが選択された時の処理（React.ChangeEvent 型を直接指定）
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const localUrl = URL.createObjectURL(file);
      setCustomImageUrl(localUrl);
    }
  };

  const handleAddMedia = () => {
    if (!newTitle.trim()) return;

    const finalImage =
      customImageUrl.trim() ||
      sampleImages[Math.floor(Math.random() * sampleImages.length)];

    const newMedia = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      isFavorite: false,
      imageUrl: finalImage,
    };

    setMediaList([...mediaList, newMedia]);
    setNewTitle('');
    setCustomImageUrl('');
  };

  const toggleFavorite = (id: number) => {
    setMediaList(
      mediaList.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setMediaList(mediaList.filter((item) => item.id !== id));
  };

  const filteredList = onlyFavorite
    ? mediaList.filter((item) => item.isFavorite)
    : mediaList;

  return (
    <ThemeProvider theme={netflixTheme}>
      <CssBaseline />

      {/* ナビゲーションバー */}
      <AppBar position="static" sx={{ backgroundColor: '#000000', borderBottom: '1px solid #333' }}>
        <Toolbar className="max-w-2xl w-full mx-auto flex justify-between">
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: '#E50914',
              fontWeight: 900,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            WATCH LIST
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={onlyFavorite}
                onChange={(e) => setOnlyFavorite(e.target.checked)}
                color="primary"
                size="small"
              />
            }
            label={<Typography variant="body2" sx={{ fontWeight: 600 }}>お気に入りのみ</Typography>}
          />
        </Toolbar>
      </AppBar>

      {/* メインコンテンツ */}
      <div className="p-8 max-w-2xl mx-auto space-y-4">
        {/* 入力フォーム */}
        <div className="space-y-3 mb-6 bg-[#1f1f1f] p-4 rounded-lg border border-[#333]">
          <div className="flex gap-2">
            <TextField
              label="新しい作品名"
              variant="outlined"
              size="small"
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <FormControl size="small" className="w-40">
              <InputLabel id="category-select-label">カテゴリ</InputLabel>
              <Select
                labelId="category-select-label"
                value={newCategory}
                label="カテゴリ"
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <MenuItem value="映画">映画</MenuItem>
                <MenuItem value="アニメ">アニメ</MenuItem>
                <MenuItem value="ドラマ">ドラマ</MenuItem>
                <MenuItem value="その他">その他</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* 画像入力エリア */}
          <div className="flex gap-2 items-center">
            <TextField
              label="画像URL（任意）"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="https://example.com/image.jpg"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
            />

            <label htmlFor="image-upload-input">
              <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <Button
                component="span"
                variant="outlined"
                size="small"
                startIcon={<UploadFile />}
                className="whitespace-nowrap"
              >
                画像選択
              </Button>
            </label>

            <Button
              variant="contained"
              onClick={handleAddMedia}
              className="whitespace-nowrap font-bold"
            >
              追加
            </Button>
          </div>
        </div>

        {/* 作品カードリスト */}
        {filteredList.map((item) => (
          <Card
            key={item.id}
            variant="outlined"
            sx={{
              borderColor: '#333',
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s',
              '&:hover': {
                transform: 'scale(1.03) translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.9)',
                borderColor: '#E50914',
                '& .card-media': {
                  transform: 'scale(1.1)',
                  filter: 'brightness(1.1)',
                },
              },
            }}
          >
            <CardMedia
              component="img"
              height="160"
              image={item.imageUrl}
              alt={item.title}
              className="card-media"
              sx={{
                transition: 'transform 0.4s ease-in-out, filter 0.4s ease-in-out',
                objectFit: 'cover',
              }}
            />

            <CardContent className="flex justify-between items-center">
              <div>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                <Typography color="text.secondary" variant="body2">{item.category}</Typography>
              </div>

              <div className="flex items-center gap-1">
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite style={{ color: '#E50914' }} />}
                  checked={item.isFavorite}
                  onChange={() => toggleFavorite(item.id)}
                />

                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(item.id)}
                  color="default"
                >
                  <Delete />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ThemeProvider>
  );
}

export default App;
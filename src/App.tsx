import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
function App() {
  // 作品リストを state として管理する
  const [newTitle, setNewTitle] = useState('');
  const [mediaList, setMediaList] = useState([
    { id: 1, title: 'インセプション', category: '映画' },
    { id: 2, title: '鬼滅の刃', category: 'アニメ' },
    { id: 3, title: 'VIVANT', category: 'ドラマ' },
  ]);

  // 作品を追加する関数
  const handleAddMedia = () => {
    if (!newTitle.trim()) return; // 空文字の場合は何もしない
    const newMedia = {
      id: Date.now(),
      title: newTitle,
      category: '未設定',
    };
    setMediaList([...mediaList, newMedia]);
    setNewTitle(''); // 入力欄をクリア
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">観たいものリスト</h1>
      <div className="flex gap-2 mb-6">
  <TextField
    label="新しい作品名"
    variant="outlined"
    size="small"
    fullWidth
    value={newTitle}
    onChange={(e) => setNewTitle(e.target.value)}
  />
  <Button variant="contained" onClick={handleAddMedia}>
  追加
</Button>
</div>

      {mediaList.map((item) => (
        <Card key={item.id} variant="outlined">
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography color="text.secondary">{item.category}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default App;
# 标准化布局系统故障排除指南

## 常见问题及解决方案

### 1. GitRepo API 错误

**错误信息**: `API Error: Unexpected token '<', "<!DOCTYPE "... is not valid JSON`

**可能原因**:

- API URL 格式不正确
- GitHub API 限制或网络问题
- 代理配置问题

**解决方案**:

1. 确保 URL 格式正确：

   ```yaml
   widget:
     type: gitrepo
     standardized: true
     url: https://api.github.com/repos/owner/repo # 确保是 API URL
   ```

2. 检查网络连接和 GitHub API 状态

3. 如果问题持续，可以尝试增加刷新间隔：
   ```yaml
   widget:
     refreshInterval: 120000 # 2分钟
   ```

### 2. Shortcut Description 显示不全

**问题**: Description 文字被截断或显示不完整

**解决方案**:

1. 确保容器高度足够：

   ```yaml
   widget:
     type: shortcut
     standardized: true
     size: medium # 或 large
   ```

2. 调整列数和间距：

   ```yaml
   widget:
     columns: 3 # 减少列数
     gap: 6 # 增加间距
   ```

3. 使用 banner 形状以获得更多空间：
   ```yaml
   widget:
     shape: banner
   ```

### 3. 布局问题

**问题**: 组件排列不整齐或大小不一致

**解决方案**:

1. 确保所有组件都使用标准化模式：

   ```yaml
   widget:
     standardized: true
     size: medium # 统一尺寸
     variant: default # 统一变体
   ```

2. 检查容器配置：
   ```yaml
   # 确保在同一个组中
   - My Group:
       - Item 1:
           widget:
             standardized: true
             size: medium
       - Item 2:
           widget:
             standardized: true
             size: medium
   ```

### 4. 样式问题

**问题**: 组件样式不正确或主题不匹配

**解决方案**:

1. 清除浏览器缓存
2. 检查 homepage 主题设置
3. 确保使用正确的变体：
   ```yaml
   widget:
     variant: default # default, compact, minimal
   ```

### 5. 性能问题

**问题**: 页面加载缓慢或组件响应慢

**解决方案**:

1. 增加刷新间隔：

   ```yaml
   widget:
     refreshInterval: 300000 # 5分钟
   ```

2. 减少同时显示的组件数量

3. 使用 compact 变体：
   ```yaml
   widget:
     variant: compact
   ```

## 调试技巧

### 1. 检查浏览器控制台

- 打开开发者工具 (F12)
- 查看 Console 标签页的错误信息
- 检查 Network 标签页的 API 请求

### 2. 验证配置

- 确保 YAML 语法正确
- 检查缩进和格式
- 验证 URL 和参数

### 3. 逐步测试

- 先测试单个组件
- 逐步添加更多组件
- 对比标准化和原有模式

## 配置最佳实践

### 1. GitRepo 组件

```yaml
widget:
  type: gitrepo
  standardized: true
  size: medium
  variant: default
  url: https://api.github.com/repos/owner/repo
  refreshInterval: 60000
```

### 2. Shortcut 组件

```yaml
widget:
  type: shortcut
  standardized: true
  size: medium
  variant: default
  shape: banner
  columns: 4
  gap: 4
  iconSize: 24
  items:
    - name: "名称"
      href: "链接"
      icon: "图标"
      description: "描述"
```

### 3. 布局建议

- 使用统一的 `size` 和 `variant`
- 合理设置 `columns` 数量
- 适当调整 `gap` 间距
- 考虑使用 `banner` 形状以获得更多空间

## 联系支持

如果问题仍然存在，请提供以下信息：

1. 错误信息截图
2. 配置文件内容
3. 浏览器控制台日志
4. 使用的 homepage 版本

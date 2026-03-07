import Icon from './ui/Icon'; // Adjust path based on where your file is

export default function MyComponent() {
  return (
    <div className="flex gap-4">
      {/* Example 1: Standard Research Icon */}
      <Icon name="MagnifyingGlassIcon" className="text-cyan-400" />

      {/* Example 2: Solid Analysis Icon */}
      <Icon name="ChartBarIcon" variant="solid" size={32} className="text-blue-500" />
      
      {/* Example 3: Clickable Download Icon for Resume */}
      <Icon name="ArrowDownTrayIcon" onClick={() => console.log('Downloading...')} />
    </div>
  );
}